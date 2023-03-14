//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Hospital_Management.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Patient
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Patient()
        {
            this.Reports = new HashSet<Report>();
        }
    
        public int Patient_Id { get; set; }
        public string Patient_Name { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string Patient_Address { get; set; }
        public string Contact_No { get; set; }
        public string Guardian_Name { get; set; }
        public string Emergency_contact_no { get; set; }
        public string Nature_Of_Disease { get; set; }
        public string Patient_Condition { get; set; }
        public string Doctor_Name { get; set; }
        public string Room_Type { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Report> Reports { get; set; }
    }
}
