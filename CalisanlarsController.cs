using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication7.Models;

namespace WebApplication7.Controllers
{
    public class CalisanlarsController : Controller
    {
        private CalisanDBEntities db = new CalisanDBEntities();

     
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Listele()
        {

            List<Calisanlar> c = db.Calisanlar.ToList();
            return Json(c,JsonRequestBehavior.AllowGet);

        }
        public ActionResult DeleteSelected(int deleteid)
        {
            Calisanlar c = db.Calisanlar.FirstOrDefault(x=>x.id==deleteid);
            if (c!=null)
            {
                db.Calisanlar.Remove(c);
            }
            db.SaveChanges();

            return Json(c,JsonRequestBehavior.AllowGet);
        }
        public  ActionResult AddOrSave(Calisanlar calisanlar,string ideditOrAdd)
        {
            Calisanlar c;
            if (ideditOrAdd =="")//add
            {
                 c = db.Calisanlar.Add(calisanlar);
            }
            else
            {
                 c = db.Calisanlar.FirstOrDefault(x=>x.id.ToString()== ideditOrAdd);
                c.Tecrube = calisanlar.Tecrube;
                c.Ad= calisanlar.Ad;
                c.Email = calisanlar.Email;
                c.Telefon = calisanlar.Telefon;
            }
            db.SaveChanges();
     
            return Json(c,JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetSelected(int recordid)
        {
           
                Calisanlar c = db.Calisanlar.FirstOrDefault(x => x.id == recordid);
      
           
            return Json(c,JsonRequestBehavior.AllowGet);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
