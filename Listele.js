/// <reference path="../jquery-3.2.1.js" />
/// <reference path="../jquery-3.2.1.min.js" />



Listele();

function Listele() {


    $.ajax({
        url: '/Calisanlars/Listele',
        dataType: "json",

        type: "POST",
        success: function (response) {
        
            $("#mydiv").html("");
            $.each(response, function (i, e) {

                $("#mydiv").append(

                    "<div id='myrow'  class='row'>" +
                        "<div class='col-md-2'> " + e.Ad+ "</div>" +
                        "<div class='col-md-2'> " + e.Email + "</div>" +
                        "<div class='col-md-2'>" +e.Telefon+"</div>" +
                        "<div class='col-md-2'>" + e.Tecrube + "</div>" +
                          "<div class=' btn-group col-md-4'>" +
                         "<a>" + "<i <button  onclick='GetSelected(\"" + e.id + "\")' type='button' class='btn btn-primary'>Düzenle</button></i>" + "</a>" +
                         "<a>" + "<i <button  onclick='DeleteSelected(\"" + e.id + "\")' type='button' class='btn btn-danger'>Sil</button></i>" + "</a>" +
                     "</div>" +
                         "</div>"


            );

            })


        }
    });
}
function DeleteSelected(deleteid)
{
  

    swal({
        title: 'Kayıt Silinecek Onaylıyormusunuz.!',
        text: "Seçtiğiniz Kayıt Silinecektir.Bu İşlemi Onaylıyormusunuz!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'İptal',
        confirmButtonText: 'Evet'

    }).then(function () {
        $.get('Calisanlars/DeleteSelected', { deleteid: deleteid }, function (response) {
            if (!response.IsErr) {
                console.log(response);
            }
              
            swal
               (
                    'İşlem Başarılı',
                    'Silme İşleminiz Başarıyla Gerçekleştirilmiştir',
                    'success'
                )
         
            Listele();
          

        });
    });
}


var ideditOrAdd = "";
function GetSelected(id) {
    $.getJSON("/Calisanlars/GetSelected", { recordid: id }, function (response) {
        ideditOrAdd = response.id;
        $("#Aditxt").val(response.Ad);
        $("#Emailtxt").val(response.Email);
        $("#TecrubeTxt").val(response.Tecrube);
        $("#Telefontxt").val(response.Telefon);

    });
}
function Add() {
    var calisanlar =
    {
        Ad: $("#Aditxt").val(),
        Email: $("#Emailtxt").val(),
        Telefon: $("#Telefontxt").val(),
        Tecrube: $("#TecrubeTxt").val(),
    };

    $.post('Calisanlars/AddOrSave', { calisanlar: calisanlar, ideditOrAdd: ideditOrAdd }, function (response)
    {
        if (!response.IsErr)
        {
           
            Reset();
            swal
              (
                   'İşlem Başarılı',
                   'İşleminiz Başarıyla Gerçekleştirilmiştir',
                   'success'
               )
            Listele();
        }
    });
}

function Reset() {
    $("#Aditxt").val("");
    $("#Emailtxt").val("");
    $("#Telefontxt").val("");
    $("#TecrubeTxt").val("");
}



