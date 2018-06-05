function testjs(x)
      {
      alert (x);
      }
function nofunction()
   {
    ////do nothing
   }
function showmodal()
   {
   $(".overlay").fadeIn('slow');
   }


function hidediv(x)
   {
   $(x).fadeOut('fast');
   }

function hidemodal()
   {
   $("#overlay").fadeOut('fast');
   }
function spopcontent1()
   {
   $("#popcontent1").fadeIn('slow');
   }
function hpopcontent1()
   {
   $("#popcontent1").fadeOut('fast');
   $("#overlay").fadeOut('fast');
   }
function showmodalitem(resource)
   {
   showmodal();
   spopcontent1();
   $("#popcontent1child").load(resource);
   }
function previewer(page,id)
   {
   showmodal();
   spopcontent1();
   $("#popcontent1child").load(page+'?uid='+id);
   }
      

function loadform(id)
     {
     $("#ajaxload").load(id);
    // $("#pager").fadeOut('fast');
     }
function loadpage(id)
     {
     $("#ajaxload").load(id);
     $("#pager").fadeOut('fast');
     }
 
function clea(x)
     {
$(x).val("");
$(x).html("");
     }
function clearform(x)
      {
 $(x)[0].reset();
      }
function clearform2(x)
      {
 $('input').val('');
 $('select').val('0');
  $('textarea').val('');
 
      }
///////////////////////////////////////////############################Load feed

function load(x,y)           /////x-fetch page name e.g. allnews.php,  >>> y-parameters e.g. ?id=x&category=c
    {
    $("#pager").fadeIn('fast');
    resetPagingBut();
    $(".holdresource").val("");
    $(".holdresource").val(x);
    var current_page=$(".offset").val();
    var rpp=$(".rpp").val(); 
    rpp=parseInt(rpp);
      
    current_page=parseInt(current_page); 
    
    
    //////////////////////////////////////////////////////Count total
    
     $.ajax({
  method:'GET',
  url:x+y,
  success: function(feedback)
              {
     var strat_hree=feedback.indexOf('strat_hree');  //////////////////Start handle total for paging
     strat_hree=strat_hree+10;
     var edn_hree=feedback.indexOf('edn_hree');
     var totalall=feedback.substring(strat_hree,edn_hree); 
     $(".totalall").val(totalall);                   ///////////////////End handle total for styling
     
            }
        });
    /////////////////////////////////////////////////////End of count tatal
    
    $("#ajaxload").load(x+y);
    
    }

//////////////////////////////////////////#############################End of load feed
///////////////////////////////////////////############################Load page standard

function loadstd(resource,feedbackdiv,params)           /////x-fetch page name e.g. allnews.php,  >>> y-parameters e.g. ?id=x&category=c
    {
    
  fields=params;
 $.ajax({
  method:'GET',
  url:resource,
  data:fields,
  beforeSend:function()
       {
     $("#processing").show();
       },
  
  complete:function ()
       {
      $("#processing").hide();  
       },
  success: function(feedback)
       {
     $(feedbackdiv).html(feedback);   
                    
       }
        
       
    });
    }
  

//////////////////////////////////////////#############################End of load feed
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~add to db Action Functions
function addtodb(fiel,passedvals,actio) /// fiel-fetch from here, passedvals-values passed directly, actio - action page
   {
   
   fielsplit=fiel.split(",");
   var val=Array();
   for(x=0;x<fielsplit.length;x++)
      {
      
      var input_type=$('.'+fielsplit[x]).attr('type');
      if(input_type=='radio')
        {
       val[x] = $('input[name='+fielsplit[x]+']:checked').val();
        } 
       else
        {
        val[x] = $("."+fielsplit[x]).val();  
        }
         
     // val[x]=str.replace("<sepalator>","<separator>");  ///// Replace if reserved word occures                    
      }
   var fielarray=val.join(',,,...///');  /// sepalator is the separator/delimeter. it should not appear
   
   
 fields="vals="+encodeURIComponent(fielarray)+"&passedvals="+encodeURIComponent(passedvals);
 $.ajax({
  method:'POST',
  url:actio,
  data:fields,
  beforeSend:function()
       {
     $("#loading").show(); 
       },
  
  complete:function ()
       {
      $("#loading").hide();  
       },
  success: function(feedback)
       {
     $("#formfeedback").html(feedback); 
     $(".formfeedback").html(feedback);
       }
  });
   }
  
 function quickaddtodb(fiel,passedvals,actio) /// fiel-fetch from here, passedvals-values passed directly, actio - action page
   {
   
   
   
   fielsplit=fiel.split(",");
   var val=Array();
   for(x=0;x<fielsplit.length;x++)
      {
        if ($('.'+fielsplit[x]).is(':radio')) {
        val[x] = $("."+fielsplit[x]+':checked').val(); 
             }
        else
          {
      val[x] = $("."+fielsplit[x]).val();  
          }
       
      }
   var fielarray=val.join(',,,...///');  /// sepalator is the separator/delimeter. it should not appear
   
   
 fields="vals="+fielarray+"&passedvals="+passedvals;
 $.ajax({
  method:'POST',
  url:actio,
  data:fields,
  
  success: function(feedback)
       {
    
     //$("#formfeedback").html(feedback); 
     
       }
  });
   }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Add to db Action functions
/////////////////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Standard DB Action
function refreshfun(x)
    {
   params=x.split(",");
      
  if(x='get_started_preferences')
      {
     loadpage('resources/get_started_preferences.php');    
      }  
    elert (x);    
    }
function reloadpage()
   {
    location.reload();
   }   
function redirectto(url)
   {
   //alert (url);
  window.location=url; 
   }  
function reload(filt)  /////filter is where
   {
   $('.holdfilter').val(filt);
   var hresource=$(".holdresource").val(); ///////////////////read the resource name
   var where=$(".holdfilter").val(); //////////////////////////Fetch the filter variable
   var totalall=$(".totalall").val(); totalall=parseInt(totalall); ////////////////Count total results for paging purposes
   var rpp=$(".rpp").val();              rpp=parseInt(rpp); ////////////////////How many results do you want per page
   var offset=$(".offset").val();       offset=parseInt(offset); ///////////////Which page to show 
   var search=$(".tbsearch").val();  search=search.replace(/ /g,"+");                ///////////////The search term from the search box
   var orderby=$(".orderby").val();                              //////////////What field to order by
   var dir=$(".dir").val();                                      /////////////Direction ascending or descending
    if(dir=="asc")
      { //dir="desc";
       }
   else
      { 
        //dir="asc";
         }
   //////////////////////////////////////handle where empty box &&
     if((where==''))
            {
            var wher="";
            }
       else
            {
            var wher="&where=";
            }
        if(search.length>3)
         {
         searc="&search="+search;
         }
    else
         {
         searc='';
         }
    //////////////////////////////////////end of handle where empty box &&
   
   
  
   
       
   if(rpp+offset<totalall)
        {
   //rpp=rpp+10; 
        }
   if(rpp+offset>=totalall)
        {
      //  $("#load_more").css({'background-color':'grey','cursor':'default'});
        }
   
   $(".rpp").val("");
   $(".rpp").val(rpp);
   var params="?rpp="+rpp+"&offset="+offset+wher+where+searc+"&dir="+dir+"&orderby="+orderby;  //alert (params);      
   load(hresource,params); 
        
   
   }
function refreshpermissions(resourc) ///vaed trigger, id - link id, image id
    {
        
    
     reso = resourc.split(",");
     var tab = reso[0];
     var x = reso[1];
       
    loadstd(tab,'#dynadiv','selectedval='+x) 
    }      
function perm_forms(x)
    {
    //alert (x);
    $(x+'m').attr('id','message');
    $(x+'p').attr('id','progress');
    $(x+'f').attr('id','myForm');
    }
    
    
function loginstatus()
  {
  session_status();
  }    
    
function session_status(thislocation)
  {
     $.ajax({
  method:'POST',
  url:thislocation+'resources/session-status.php',
  success: function(feedback)
       {
     
      if(feedback=='0')
          {
       $('#loggedout').fadeIn('fast');
       $('#loggedin').fadeOut('fast');
          }
       else
          {
       $('#loggedin').fadeIn('fast').html(feedback);
       $('#loggedout').fadeOut('fast');
          }   
       }
   });
  }
function testfun(x)
    {
    loadpage('resources/get_started_preferences.php');    
    }
function dbaction(actionpage, params, successfun, successparams) //actionpage-page handling ajax, params-x=123&y=456..., successfun-the fuction to call if successful, successparams-the parameters to pass to success function
   {
        $(".feedback").fadeIn('fast');    
        $("#feedback").fadeIn('fast'); 
fields=params;
 $.ajax({
  method:'POST',
  url:actionpage,
  data:fields,
  beforeSend:function()
       {
     $("#processing").show();
     $(".loader").show();
       },
  
  complete:function ()
       {
      $("#processing").hide();  
      $(".loader").hide();
       },
  success: function(feedback)
       {
     $(".feedback").html(feedback);    
     $("#feedback").html(feedback); //alert (fields); 
     
     setTimeout(function()
        {
     //   $(".feedback").fadeOut('3000');    
     //   $("#feedback").fadeOut('3000'); 
        },5000
     );
     if(feedback.search("uccess"))
           {
            //refresh form
            $(".stdform")[0].reset();
            //success calls another function. function was passed as a variable n will be converted first
           // find object  
              var fn = window[successfun];
              var para = [successparams];
          // is object a function?
            if (typeof fn === "function") {fn(successparams);}

              }
         else
           {
            
           }    
       }
  });
   }

////////////////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of Std DB action
function quickdbaction(actionpage, params, successfun, successparams) //actionpage-page handling ajax, params-x=123&y=456..., successfun-the fuction to call if successful, successparams-the parameters to pass to success function
   {
 
fields=params;
 $.ajax({
  method:'POST',
  url:actionpage,
  data:fields,
  
  
  success: function(feedback)
       {
        
     $("#feedback").html(feedback); 
     if(feedback.search("uccess"))
           {
            //success calls another function. function was passed as a variable n will be converted first
           // find object  
              var fn = window[successfun];
              var para = [successparams];
          // is object a function?
            if (typeof fn === "function") {fn(successparams);}

              }
         else
           {
            
           }    
       }
  });
   }

////////////////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of quick DB action
///////////```````````````````````````````````````````````````````````Change action
function changeaction(actionpage,params,successfun,successparams)//<a href="#" onclick="changeaction('testpage.php','uid=1,did=2','#suc','reload','')">Test change action</a>
       {
 //alert (actionpage+params+successfun+successparams);          
fields='vals='+params;
 $.ajax({
  method:'POST',
  url:actionpage,
  data:fields,
  beforeSend:function()
       { $("#processing").show(); },
  
  complete:function ()
       { $("#processing").hide();  },
  success: function(feedback)
       { $('.successdiv').html(feedback); 
     if(feedback.match("uccess"))
             {
            //success calls another function. function was passed as a variable n will be converted first
           // find object  
              var fn = window[successfun];
              var para = [successparams];
          // is object a function?
            if (typeof fn === "function") {fn(successparams);}
              }
         else
           {  }    
            }
          });  
       }
////////``````````````````````````````````````````````````````````````End of change action
//////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Custom edit function
function editform(table,pname,pvalue,tfields,formfields)   ///table to edit, class of the hidden primary field, value of table uid to edit, table fields to fetch and return, classname of form input elements
   {
    
  
   fields='table='+table+'&pvalue='+pvalue+'&tfields='+tfields;
 $.ajax({
  method:'POST',
  url:'action/editfetch.php',
  data:fields,
  beforeSend:function()
       {
     $("#processing").show();
       },
  
  complete:function ()
       {
      $("#processing").hide();  
       },
  success: function(feedback)
       {
      ///////primary field set
     $(pname).val(pvalue);          
     valsplit=feedback.split(",");
     fieldsplit=formfields.split(",");
     for(x=0;x<fieldsplit.length;x++)
           {
          var elementType = $("."+fieldsplit[x]).prop('type');  // check input type to handle updating the content
          if(elementType=='file')
             {
             if(valsplit[x].length>2)
                {
              $(".i"+fieldsplit[x]).html('<img src="profiles/'+valsplit[x]+'"height="50" alt="image">');
                }
              else
                {
              $(".i"+fieldsplit[x]).html('<img src="profiles/defcrown.png"height="50" alt="image">');
                }
             }
          else
            {
         $("."+fieldsplit[x]).val(valsplit[x]);   
            }
           }   
       }
       
  });
   }

////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of custom edit
///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~standard form action
function formready(formid)
{
formhandler('#'+formid); 
};
 

function formhandler(formid){

    var options = { 
    beforeSend: function() 
    {
        $("#progress").show();
        //clear everything
        $("#bar").width('0%');
        $("#message").html("");
        $("#percent").html("0%");
    },
    uploadProgress: function(event, position, total, percentComplete) 
    {
        $("#bar").width(percentComplete+'%');
        $("#percent").html(percentComplete+'%');
 
    },
    success: function() 
    {
        $("#bar").width('100%');
        $("#percent").html('100%');
 
    },
    complete: function(response) 
    {
        $("#message").html("<font color='green'>"+response.responseText+"</font>");
        ///if success, refresh form
         var res=response.responseText;
        var suc=(res.search("ucces"))
        if(suc>=0)
           {
         $(formid)[0].reset();
           }
        
       
    },
    error: function()
    {
        $("#message").html("<font color='red'> ERROR: unable to upload files</font>");
 
    }
 
}; 
 
     $(formid).ajaxForm(options);
 
};
 

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of standard form action

///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Paging

function first()
   {
   var hresource=$(".holdresource").val(); ///////////////////read the resource name
   var where=$(".holdfilter").val(); //////////////////////////Fetch the filter variable
   var totalall=$(".totalall").val(); totalall=parseInt(totalall); ////////////////Count total results for paging purposes
   var rpp=$(".rpp").val();              rpp=parseInt(rpp); ////////////////////How many results do you want per page
   var offset=0;                                           ///////////////Which page to show 
   var search=$(".tbsearch").val();     search=search.replace(/ /g,"+");  ///////////////The search term from the search box
   var orderby=$(".orderby").val();                              //////////////What field to order by
   var dir=$(".dir").val();                                      /////////////Direction ascending or descending
    if(orderby!='uid')
     {
    if(dir=="asc")
      { dir="desc"; }
   else 
      { dir="asc"; }
     } 
   //////////////////////////////////////handle where empty box &&
     if((where==''))
            {
            var wher="";
            }
       else
            {
            var wher="&where=";
            }
        if(search.length>3)
         {
         searc="&search="+search;
         }
    else
         {
         searc='';
         }
    //////////////////////////////////////end of handle where empty box &&
   $(".offset").val(offset);
   var params="?rpp="+rpp+"&offset="+offset+wher+where+searc+"&dir="+dir+"&orderby="+orderby;        
  
 
  load(hresource,params);
   }

function prev()
   {
     var hresource=$(".holdresource").val(); ///////////////////read the resource name
   var where=$(".holdfilter").val(); //////////////////////////Fetch the filter variable
   var totalall=$(".totalall").val(); totalall=parseInt(totalall); ////////////////Count total results for paging purposes
   var rpp=$(".rpp").val();              rpp=parseInt(rpp); ////////////////////How many results do you want per page
   var offset=$(".offset").val();       offset=parseInt(offset); ///////////////Which page to show 
   var search=$(".tbsearch").val();     search=search.replace(/ /g,"+");   ///////////////The search term from the search box
   var orderby=$(".orderby").val();                              //////////////What field to order by
   var dir=$(".dir").val();                                      /////////////Direction ascending or descending
    if(orderby!='uid')
     {
    if(dir=="asc")
      { dir="desc"; }
   else 
      { dir="asc"; }
     } 
   //////////////////////////////////////handle where empty box &&
     if((where==''))
            {
            var wher="";
            }
       else
            {
            var wher="&where=";
            }
      if(search.length>3)
         {
         searc="&search="+search;
         }
    else
         {
         searc='';
         }
    //////////////////////////////////////end of handle where empty box &&
   
       offset=offset-rpp;
       if(offset<0)
          {
          offset=0;
          }
  
  $(".offset").val(offset);
   var params="?rpp="+rpp+"&offset="+offset+wher+where+searc+"&dir="+dir+"&orderby="+orderby;
  load(hresource,params);
   }

function next()
   {
  
   }
function last()
   {
  
   }


/////////////////////////////////////////////#end of paging functions
function filter(field, value)
    {
  
    }
function selectfilter(field, selectname)   //////Filter called by drop down box ..... field-- in the database, selectname--
    {
   
    }
////////////////////////////////////////#######################Function rearrange

function rearrange(x,y,z)    //////////////table, fieldname, fieldtitle
    {
  
    }
///////////////////////////////////////########################End of rearrange
//////////////////////////////////////######################### Hide paging buttons
function resetPagingBut()
    {    
 
    }
//////////////////////////////////////######################### End of hide paging buttons
//////////////////////////////////////////////Reset filters
function searchtb(table,fields)
   {
  
  
   }

///~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of paging
////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Select Box handler

function selectchange(x,res,selectedval,targetdiv)
      {
 
   }
 function showdiv(hideitem,showitem)
    {
    $(hideitem).fadeOut('fast');
    $(showitem).fadeIn('fast');
    }
 function showeasy(div)
    {
     $(div).fadeIn('slow');
    }
////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~End of select box handler
function smallmore(x)
   {
   $("#ttaction").fadeOut('fast');
   $(".tt"+x).fadeIn('fast');
   }
//////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Exam generator


  function loginbox(x,thislocation)    //////show login box
   {
   $('.overlay').fadeIn('500');
   var params='section='+x;
   
   loadstd(thislocation+'/resources/loginbox.php','.overlayin',params);
      
   }
function securelogin(thislocation)
   {
   var uname = $('.uname').val();
   var upass = $('.upass').val();
   var params='uname='+uname+'&upass='+upass;
   dbaction(thislocation+'/action/login-handler.php',params,'','');
    
   }  
function logmeout(thislocation)
   {
dbaction(thislocation+'/action/logmeout.php','params','','');
hidediv('.uflname');
   } 
   
function session_check(thislocation)
   {
var params = "";

dbaction(thislocation+'/action/sessioncheck.php',params,"","");
   }
   
   
   
   
   
function signmeup(thislocation)
   {
   var useremail=$('.useremail').val();
   var password=$('.passwordd').val();
   var fullname=$('.fullname').val();
   var category=$('.category').val();
   
   var params='useremail='+useremail+'&password='+password+'&fullname='+fullname+'&category='+category;
   dbaction(thislocation+'/action/signup-handler.php',params,'','');
   }
 function hideOverlay()   //////hide overlay on overlay click
      {
      $('.overlay').fadeOut('500'); 
      $('#overlaybox').fadeOut('500');
      
      }
  
 
  function logoutbox()
   {
  
   }
  function focushere(x)
  {
 $('.logint').css('background-color','#188A66');
  $(x).css('background-color','#1B9C73');
  $('.sbox').css('display','none');
  $(x+'x').fadeIn('slow');
  }
function addinput(itype,iid,ivalue)    ////itype-type of input, id - iinput class or id, ivalue-value you want to add
   {
   $(iid).val(ivalue);
   //alert (iid);
   }
function select_days_in_month()
   {
   var month=$('.selectmonth').val();
   var year=$('.thisyear').val(); 
   var yearmonth='year='+year+'&month='+month;
   selectlesson();   
   loadstd('resources/attendance_select_month.php','.loaddays',yearmonth);
   }

function smallwindow(wid,page,id)   /////////// call smallwindow() php function, call with this function
   {
    $('.smallwindow').css('display','none');
    $('#smallwindow'+wid).fadeIn('fast');
    $("#inner"+wid).load(page+'?uid='+id);
   }
 function hidesmallwindow()
   {
    $('.smallwindow').fadeOut('fast');
   }  
  
 function quickmessage(x)    ////////////////////////////x is recipient
   {
    $('#quickmessage').slideToggle();
   }
function appendtext(div,text,p)
   {
  $(div).html(text);

  $(p).css('background-color',"#9ca933");
 
   }   
   
 function realappend(div,element)
   {
   $(div).append(element);
   }  
   

 
   

 function sendmessage(mid,rid,cbox)
   {
   var cont=$('#'+mid).val(); 
   params='type='+2+'&content='+cont+'&rid='+rid+'&cbox='+cbox;
   dbaction('dbact/send_message.php',params,testjs,'done done');
   
   } 
 function sendnewmessage()
   {
   var mess=$('#mess').val();
   var recipien=$('#recipien').val();
   params='type='+1+'&mess='+mess+'&recipien='+recipien;
   dbaction('dbact/send_message.php',params,testjs,'done done');
   
   } 

 function forgotpass(thislocation)
    {
    var email=$('.forgotemail').val();
    var params='email='+email;
    dbaction(thislocation+'/action/forgot-pass.php',params,'','');
    }   
    
function previewProduct(x,thislocation)
    {
     $('#overlaybox').fadeIn('#fast');
     var params = "pid="+x;
     loadstd(thislocation+'/jresources/productdetails.php',"#overlaycontent",params);
    } 
 function mycartview(x,thislocation)
    {
     $('#overlaybox').fadeIn('#fast');
     var params = "oid="+x;
     loadstd(thislocation+'/jresources/mycartsummary.php',"#overlaycontent",params);
    }    
function subscribe_order(x,thislocation)
    {
     $('#overlaybox').fadeIn('#fast');
     var params = "oid="+x;
     loadstd(thislocation+'/jresources/subscribeorder.php',"#overlaycontent",params);
    }    
function subscribeconfirm()
    {
    var oid = $('#soid').val();
    var freq = $('#cycle').val();
    var params = "oid="+oid+'&freq='+freq;
    dbaction('../action/subscribeorder.php',params,'','');
    }

 function rate(x)
    {
        $('#rstars').val(x);
        $('.rat').css('background','transparent');
        for(var i =1; i<=x; ++i)
            {
            $('#r'+i).css('background','#ffeb3b');
            }
    }
 function rateService(x,thislocation)
    {
      $('#overlaybox').fadeIn('#fast');
     var params = "pid="+x;
     loadstd(thislocation+'/jresources/rateservice.php',"#overlaycontent",params);  
    } 
    
 function servicerate(x)
     {
        var web = $('#siteexperience').val();
        var delivery = $('#deliveryexperience').val();
        var stars = $('#rstars').val();
        var rmessage = $('#rmessage').val();
        var params = "web="+web+"&delivery="+delivery+"&stars="+stars+"&message="+rmessage+"&oid="+x;
        dbaction('../action/rateservice.php',params,"","");
     }
 function subscribeOrder(x,thislocation)
    {
      $('#overlaybox').fadeIn('#fast');
     var params = "pid="+x;
     loadstd(thislocation+'/jresources/subscribeorder.php',"#overlaycontent",params);  
    } 
    
 
   
function scrolltop() 
   {
    $('html, body').animate({scrollTop:0},'slow');
   }             
function scrollbottom() 
   {
    window.scrollTo(0,document.body.scrollHeight);
   }         
function rpp_action(page,category,search)
   {
   var rpp=$('.rpp').val(); 
   /////Create new url
   var url="?catid="+category+'&search='+search+'&page='+page+'&rpp='+rpp;
   redirectto(url);  
   }   
   


function toast(x,message)
   {
    ///redtoast, whitetoast,blacktoast, greentoast
   $('.'+x).fadeIn('500').html(message);
  
  setTimeout(function()
     {
    $('.'+x).fadeOut('1000').html(''); 
     },3500
     );
    
   }    



 function resizeWindow()
  {
   var w =$(window).width();
  
  var wt=w/2;
  console.log(w);
  if(w<553)
    {
    $(':text').css('width',wt+'px');
    $('input[type=number]').css('width',wt+'px');
    $('select').css('width',wt+'px');
    $('.froala-box').css('width',wt+'px');
    $('.infotip').css('visibility','hidden');
    }
  else
    {
    $(':text').css('width','350px');
    $('input[type=number]').css('width','inherit');
    $('select').css('width','350px');
    $('.froala-box').css('width','auto');
    $('.infotip').css('visibility','visible');
    }
  }   
    
 function removeFroalaLogo()
     {
     var loc = window.location.href;
     var str = 'localhost';
        if(loc.indexOf(str)!=-1)
             {
                
             }
        else
           {
            
     $(".froala1 div:last").css('display','none');
     $(".froala2 div:last").css('display','none');
     $(".froala3 div:last").css('display','none');
     $(".froala4 div:last").css('display','none');
           }
     }   
    
function loadsubcat(params)
      {
      var params = "";
     loadstd('../jresources/product_subcategories.php',"#subcat",params);   
      }
function loadcat()
      {
      params="";
      loadstd('../jresources/product_categories.php',"#cats",params);
      }
  
     
function signuploginbox()
     {
        $('.hidebox').css('display','none');
        $('#lbox').fadeIn('fast');
     }
function hideother()
     {
     $('.hidebox').css('display','none');
     }
function savecartdb()
     {
     var params = "";
     dbaction('../action/cartsave.php',params,'','');
     }
function loginsignup(x,thislocation)
     {
        var ema = $('#ema').val();
        var passw = $('#passw').val();
        var flname = $('#flname').val();
        var phone = $('#phone').val();
        var email = $('#email').val();
        var password = $('#password').val();
     
     if(x==1)
        {
        var params = "email="+ema+"&password="+passw+"&action=1";
        }
     else if(x==2)
        {
        var params = "flname="+flname+"&phone="+phone+"&email="+email+"&password="+password+"&action=2";
        }
     dbaction(thislocation+'/action/loginsignup.php',params,'','');
     }
     
function savedeli(thislocation)
    {
    var dloc = $('#dloc').val();
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var emailaddress = $('#emailaddress').val();
    var mobile = $('#mobile').val();
    var company = $('#company').val();
    var floor = $('#floornumber').val();
    var housenumber = $('#housenumber').val();
    var areaname = $("#areaname").val();
    var street = $('#streetname').val();
    var estatename = $('#estatename').val();
    var additionalinfo = $('#additionalinfo').val();
    var mapcoordinates = $('#mapcoordinates').val();
    var whentoreceive = $('#whentoreceive').val();
    var leave = $('input[name=adit]:checked').val();
    var neighbor = $('#neighbor').val();
    
    
    var params = "areaname="+encodeURIComponent(areaname)+"&housenumber="+encodeURIComponent(housenumber)+"&estatename="+encodeURIComponent(estatename)+"&mapcoordinates="+encodeURIComponent(mapcoordinates)+"&whentoreceive="+encodeURIComponent(whentoreceive)+"&dloc="+dloc+"&street="+encodeURIComponent(street)+"&fname="+encodeURIComponent(fname)+"&lname="+encodeURIComponent(lname)+"&emailaddress="+encodeURIComponent(emailaddress)+"&mobile="+encodeURIComponent(mobile)+"&company="+encodeURIComponent(company)+"&floor="+encodeURIComponent(floor)+"&additionalinfo="+encodeURIComponent(additionalinfo)+"&leave="+leave+encodeURIComponent(neighbor);
    
    dbaction(thislocation+'/action/delisave.php',params,"","");
    }
    

    
    
 function showdeliverylocations(x,thislocation)
      {
        var params = "";
        if(x>0)
           {
            $('#overlaybox').fadeOut('#fast');
            $('#overlaycontent').html('');
           }
        else
           {
           
            $('#overlaybox').fadeIn('#fast');
            loadstd(thislocation+'/jresources/deliverylocations.php',"#overlaycontent",params);
           
           }
      }     
      
  function selectlocation(x,thislocation)
      {
        var params = "loc="+x;
        dbaction(thislocation+'/action/deliverylocationselect.php',params,"","");
        showdeliverylocations(x);
      }    
      
 function paypaypal()
      {
        $('.paymethod').css('display','none');
        $('#paypaypal').fadeIn('fast');
      } 
    
 function paympesa()
      {
      $('.paymethod').css('display','none');
        $('#paympesa').fadeIn('fast');
      }    
      
 
 function showtip(x) 
    {
     $('.hoverclass').css('display','none');
     $(x).fadeIn('fast');   
    }
 function hidetip()
    {
     $('.hoverclass').css('display','none');   
    }
    
 function savesettings(thislocation)
    {
      var minOpaid = $('#minOPaid').val();
      var minOfree = $('#minOFree').val();
      var deliveryCharges = $('#deliverycharges').val();
      var params = "&minOpaid="+minOpaid+"&minOfree="+minOfree+"&deliveryCharges="+deliveryCharges;
      
      dbaction(thislocation+'/action/savesettings.php',params,'','');  
    }
   
 function populate_categories()  
      {
       	var meth = "GET";
	var data_url = "http://localhost/newsapis/comments/all-comments.php?pid=" + pid + "&offset=" + offset + "&rpp=" + rpp;
	$('#cbloc' + pid).fadeIn('slow');
	$.ajax({
		type: meth,
		url: data_url,
		data: {
			get_param: 'value'
		},
		dataType: 'json',
		success: function(feedback) {
			var cblock = "#cbloc" + pid;
			if (feedback.length == 0 && $("#comm0").length == 0) {
				$(cblock + " ul").append('<li id="comm0" class="nocomments nocom' + pid + '">No comments posted. </li>');
			} else {
				$(cblock + " ul").remove('#comm0');
				$.each(feedback, function(index, element) {
					var rid = element.rid;
					var user = element.user;  
					var prof = element.prof; 
					var added_date = element.added_date;
					var comment = element.comment;  
					var reply_to = element.reply_to;
					var edited = element.edited;
					var likes = element.likes;
					var comments = element.comments;
					var rppp = element.rpp;
					///CHECK if comment is loaded and append or update it
					if ($("#comm" + rid).length > 0) {
						// exists, update
					} else {
						/////APPEND TO COMMENTS BLOCK
						$(cblock + " ul").append('<li id="comm' + rid + '"><span class="profilep">' + prof + '</span><span class="comment_b"><b>' + user + '</b>. ' + comment + '</span> <div class="comment_action"><span  class="comm_like">Like <b id="l' + rid + '">' + likes + '</b></span> <span  class="comm_reply">Reply <b id="r' + rid + '">' + comments + '</b></span></li>');
						/////__________if like or replies has no data, hide counter
						if (likes > 0) {} else {
							$('#l' + rid).css('display', 'none');
						}
						if (comments > 0) {} else {
							$('#r' + rid).css('display', 'none');
						}
					}
				});
				///////ADD LOAD MORE BUTTON
				if ($("#showmore" + pid).length > 0) {
					// exists
					var newoffset = offset + 10;
					$('#showmore' + pid).remove();
					$('<a href="#" id="showmore' + pid + '" onclick="comments_loader(' + pid + ',' + newoffset + ',10,\'uid\',\'asc\'); return false;" class="show_more_c">SHOW MORE</a>').insertAfter(cblock + " ul");
				} else {
					var newoffset = offset + 10;
				//	console.log(newoffset);
					$('<a href="#" id="showmore' + pid + '" onclick="comments_loader(' + pid + ',' + newoffset + ',10,\'uid\',\'asc\'); return false;" class="show_more_c">SHOW MORE</a>').insertAfter(cblock + " ul");
				}
				var clength = feedback.length;
			
				if (clength != 10) {
					$('#showmore' + pid).css('display', 'none');
				}
			}
		}
	}); 
      }
   
 ////////////////////_________________-school hub
 function load_learning_levels(meth,data_url)
    {
    $.ajax({
		type: meth,
		url: data_url,
		data: {
			get_param: 'value'
		},
		dataType: 'json',
		success: function(feedback) {
			$.each(feedback, function(index, element) {
				var id = element.id;
                var name = element.name;
				$('#learning_level').append('<option value="'+id+'">'+name+'</option>');
				
			});
		}
	});
    }  
 
 /////_________populate categories box   
 
 function load_categories(meth,data_url)
    {
    $.ajax({
		type: meth,
		url: data_url,
		data: {
			get_param: 'value'
		},
		dataType: 'json',
		success: function(feedback) {
			$.each(feedback, function(index, element) {
				var id = element.id;
                var name = element.name;
				$('#category').append('<option value="'+id+'">'+name+'</option>');
				
			});
		}
	});
    }  
   
  /////_________populate years box   
 
 function load_years(meth,data_url)
    {
    $.ajax({
		type: meth,
		url: data_url,
		data: {
			get_param: 'value'
		},
		dataType: 'json',
		success: function(feedback) {
			$.each(feedback, function(index, element) {
				var id = element.id;
                var name = element.name;
				$('#year').append('<option value="'+id+'">'+name+'</option>');
				
			});
		}
	});
    }  
   
    /////_________populate classes
 
 function load_classes(meth,data_url,ll)
    {
        
    $.ajax({
		type: meth,
		url: data_url+'?ll='+ll,
		data: {
			get_param: 'value'
		},
		dataType: 'json',
		success: function(feedback) {
			$.each(feedback, function(index, element) {
				var uid = element.uid;
                var name = element.name;
				$('#class').append('<option value="'+uid+'">'+name+'</option>');
                
                				
			});
		}
	});
    }  
    
    
     /////_________populate subjects 
 
 function load_subjects(meth,data_url,ll)
    {
    $.ajax({
		type: meth,
		url: data_url+'?ll='+ll,
		data: {
			get_param: 'value'
		},
		dataType: 'json',
		success: function(feedback) {
			$.each(feedback, function(index, element) {
				var id = element.id;
                var name = element.name;
				$('#subject').append('<option value="'+id+'">'+name+'</option>');
				
			});
		}
	});
    }  
  ///__________Load seletions that depend on other selections
   
 function load_dependent()
      {
        var thislocation = $('#thislocation').val(); 
        var depid = $('#learning_level').val();
        if(depid == '0')
           {
            $('#subject').find('option').remove().end() .append('<option value="0">Select Learning Level First</option>');
            $('#class').find('option').remove().end() .append('<option value="0">Select Learning Level First</option>');

           }
        else
           {
            $('#subject').find('option').remove().end().append('<option value="0">Select One</option>');
            $('#class').find('option').remove().end().append('<option value="0">Select One</option>');
            load_classes('GET',thislocation+'/resources/api_classes.php',depid);
            load_subjects('GET',thislocation+'/resources/api_subjects.php',depid);
           }
      }  
   
 function navigate(offset,rpp,where,title)
      {
      var params = "offset="+offset+"&rpp="+rpp+"&where="+where+"&showtotal=1&showpaging=1&title="+title;
      loadstd('resources/paper-list.php',"#materials",params);
      scrolltop();
      }
       
  function loadmore(offset,rpp,title)
   {
    var params = "offset="+offset+10+"&rpp"+rpp+"&showtotal=1&showpaging=1&title="+title;
    loadstd('resources/paper-list.php',"#materials",params);
   } 

  function gosearch()
    {
    var sterm = $('#sterm').val();
    if(sterm.length>0)
       {
   newsterm = sterm.replace(/ /g,'+');
    redirectto('index?search='+newsterm);
       }
    }


















   
   
   