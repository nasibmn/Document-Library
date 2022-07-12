using DocumentLibrary.Context;
using DocumentLibrary.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DocumentLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly DocumentDbContext _documentDbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public DocumentController(DocumentDbContext documentDbContext, IWebHostEnvironment webHostEnvironment)
        {
            _documentDbContext = documentDbContext;
            _webHostEnvironment = webHostEnvironment;
        }


        // Upload Documents
        [HttpPost("upload", Name = "upload")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadFile(
         List<IFormFile> files,
         CancellationToken cancellationToken)
        {
            if(files == null || files.Count == 0)
            {
                return NotFound(new { Status = "error", Message = "Not Any Document Sent From Client" });
            }
            try
            {
                foreach (var file in files)
                {
                        if (CheckIfFileValid(file))
                        {
                            await WriteFile(file);
                        }
                        else
                        {
                            return BadRequest(new { Status = "error", Message = "Invalid File Extension" });
                        }

                }
                    return Ok(new { Status = "success", Message = "Successfuly Uploaded" });
            }
                    catch(Exception exp)
                    {
                        return BadRequest(new { Status = "error", Message = exp.Message });
            }
                return StatusCode(StatusCodes.Status204NoContent ,new { Status = "error", Message = "No Content..." });
        }
        private bool CheckIfFileValid(IFormFile file)
        {
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            return (extension == ".xlsx" || extension == ".txt" ||  extension == ".xls" || 
                extension == ".pdf" || extension == ".txt" || extension == ".docx" || 
                extension == ".jpg" || extension == ".jpeg" || extension == ".png" || extension == ".doc");
        }

        private async Task<IActionResult> WriteFile(IFormFile file)
        {
            string fileName;
            DocumentModel documentModel = new DocumentModel();
            try
            {
                var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
                fileName = DateTime.Now.Ticks + extension; 
                var fileType = Path.GetExtension(file.FileName);
                var docName = Path.GetFileName(file.FileName);
                var pathBuilt = Path.Combine( "Upload\\files");

                if (!Directory.Exists(pathBuilt))
                {
                    Directory.CreateDirectory(pathBuilt);
                }
                if (file != null && file.Length > 0)
                {
                    documentModel.Id = Guid.NewGuid();
                    documentModel.DocumentName = docName;
                    documentModel.DocType = fileType;
                    documentModel.DateEntered = DateTime.Now;
                    documentModel.DocUrl = Path.Combine(pathBuilt, documentModel.Id.ToString() + documentModel.DocType);
                    using (var stream = new FileStream(documentModel.DocUrl, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    _documentDbContext.Add(documentModel);
                    _documentDbContext.SaveChanges();
                    return StatusCode(StatusCodes.Status201Created, new{ Status = "success", Message = "Document Uploaded Successfuly."});
                }
            }
            catch (Exception exp)
            {
                return BadRequest(new { Status = "error", Message = exp.Message });

            }
            return BadRequest(new { Status = "error", Message = "Unable to Upload The Document." });
        }
        // Download Documents
        [HttpGet("download")]
        public IActionResult Download( Guid id)
        {
            if(id == Guid.Empty)
            {
                return NotFound(new { Status = "error", Message = id + "  Does not exist." });
            }
            var fileDetail = _documentDbContext.Documents
                .Where(x => x.Id == id)
                .FirstOrDefault();
            if (fileDetail != null)
            {
                System.Net.Mime.ContentDisposition contentDis = new System.Net.Mime.ContentDisposition
                {
                    FileName = fileDetail.DocumentName,
                    Inline = false
                };
                Response.Headers.Add("Content-Disposition", contentDis.ToString());
                var path = Path.Combine("Upload\\files");
                var fileReadPath = Path.Combine(path, fileDetail.Id + fileDetail.DocType);
                var file = System.IO.File.OpenRead(fileReadPath);
                fileDetail.NoOfDownload++;
                _documentDbContext.SaveChanges();
                return File(file, "application/"+ fileDetail.DocType);
            }
            else
            {
                return NotFound(new { Status = "error", Message = "Could Not Find The Document." });
            }
        }

        [HttpDelete("delete")]
        public IActionResult DeleteDocument(Guid id)
        {
            try
            {
                Console.WriteLine(id);
                var document = _documentDbContext.Documents.FirstOrDefault(x => x.Id == id);
                if(document != null)
                {
                var path = Path.Combine("Upload\\files");
                var pathread = Path.Combine(path, document.Id + document.DocType);
                FileInfo file = new FileInfo(pathread);
                file.Delete();
                _documentDbContext.Remove(document);
                _documentDbContext.SaveChanges();
                return StatusCode(StatusCodes.Status204NoContent, new {Status = "succcess", Message = "Document Removed."});
                }
                return StatusCode(StatusCodes.Status404NotFound, new { Status = "error", Message = "Document Does Not Exist." });
            }
            catch (Exception exp)
            {
                return BadRequest(exp.Message);
            }
        }

        // Get all Documents
        [HttpGet]
        public IActionResult GetDocuments()
        {
            try
            {
                var documents = _documentDbContext.Documents.ToList();
                if (documents.Count > 0)
                {
                    return Ok(documents);
                }
                return NotFound(new { Status = "error", Message = "No Document To Show..." });
            }
            catch (Exception exp)
            {
                return BadRequest(exp.Message);
            }
        }

        // share document
        [HttpGet]
        [Route("share-link")]
        public IActionResult ShareLink(Guid id) { 
            DateTime expire = DateTime.Now + TimeSpan.FromMinutes(2);
            string token = MakeExpiryHash(expire);
            string link = string.Format("http://localhost:3000/share-document/?expire={0}&k={1}&id={2}", expire.ToString("s"), token,id);
            return StatusCode(StatusCodes.Status201Created ,link);
        }

        // generate a token which controlls the temp url expiration
        public static string MakeExpiryHash(DateTime expiry)
        {
            const string salt = "generaterandomhashfortempurl";
            byte[] bytes = Encoding.UTF8.GetBytes(salt + expiry.ToString("s"));
            using var sha = System.Security.Cryptography.SHA1.Create();
            return string.Concat(sha.ComputeHash(bytes).Select(b => b.ToString("x2"))).Substring(8);
        }

        [HttpGet]
        [Route("share-document")]
        public IActionResult ShareDocument(DateTime expire,string k, Guid docid)
        {
            try
            {
                string hash = MakeExpiryHash(expire);
                if (k == hash)
                {
                    if (expire < DateTime.Now)
                    {
                        return BadRequest(new { Status = "warning", Message = "URL expired.." });
                    }
                    else
                    {
                        var data = _documentDbContext.Documents.SingleOrDefault(x => x.Id == docid);
                        return StatusCode(StatusCodes.Status201Created ,data);
                    }
                }
                else
                {
                    // Invalid link
                    return BadRequest(new { Status = "error", Message = "Invalid URL..." });
                }
            }catch(Exception exp)
            {
                return BadRequest(exp.Message);
            }
        }
    }
}
