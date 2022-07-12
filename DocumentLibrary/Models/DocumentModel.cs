using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace DocumentLibrary.Models
{
    public class DocumentModel
    {
        public Guid Id { get; set; }
        public DateTime? DateEntered { get; set; }
        public string DocumentName { get; set; }
        public int NoOfDownload { get; set; }
        public string DocType { get; set; }
        public string DocUrl { get; set; }
    }
}
