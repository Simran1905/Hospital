using Hospital_Management.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Hospital_Management.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BillController : ApiController
    {
        private readonly Hospital_Management_SystemEntities1 db = new Hospital_Management_SystemEntities1();

        public BillController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }

        [HttpGet]
        public IEnumerable<Billing> List()
        {
            return db.Billings.ToList();
        }

        [HttpPost]
        public HttpResponseMessage AddBill(Billing obj)
        {
            try
            {
                db.Billings.Add(obj);
                db.SaveChanges();
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.Created);
                return response;

            }
            catch (Exception)
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                return response;
            }
        }
        [HttpPut]
        public HttpResponseMessage Update(int id, Billing obj)
        {
            try
            {
                if (id == obj.Bill_Id)
                {
                    db.Entry(obj).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                    return response;
                }
                else
                {
                    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.NotModified);
                    return response;
                }

            }
            catch (Exception)
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                return response;
            }
        }
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            Billing obj = db.Billings.Find(id);
            if (obj != null)
            {
                db.Billings.Remove(obj);
                db.SaveChanges();
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                return response;
            }
            else
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.NotFound);
                return response;
            }
        }
        [HttpGet]
        public Billing Search(int id)
        {
            Billing obj = db.Billings.Find(id);
            return obj;
        }
    }
}


