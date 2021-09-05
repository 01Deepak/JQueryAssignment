var arrsubject=[];


// function stringsplit(str){
//     debugger;
 
// var aftersplite=str.split(",");
// return aftersplite;
//  alert(aftersplite.length);

// }

function getdatafromlocalstorage(datakey)
{
var data=localStorage.getItem(datakey);
if(data!=null && data!=undefined)
{
    data=JSON.parse(data);
}
return data;
}



function appendoption(valueparameter,appendpositionid)
{
    debugger;
    var country=getdatafromlocalstorage(valueparameter);

    //alert(country.length);
     for (let index = 0; index < country.length; index++) {
        var element=document.createElement('option');
        element.value=country[index];
        element.text=country[index];

        document.getElementById(appendpositionid).append(element);
        
    //    $(appendpositionid).append(element);
        
     }

}

function changecountry(){
    //alert("changecountry fired");
    var selectedcountry=$("#ddcountry").val();

    var statekey=selectedcountry+"STATE";
    // removecountry("selectstate");
    removeoption(statekey,"ddstate");
    appendoption(statekey,"ddstate");
   // alert(selectedcountry);
    
}

function removeoption(keyparameter,ddid)
{
    // getcountrydatafromlocalstorage();
    debugger;
   // alert("removeoption fire");
    var selectelement=document.getElementById(ddid);
    var optionlength=selectelement.options.length-1;
    //alert(optionlength);
     for (let index = optionlength; index >= 1; index--) {
      
        
       selectelement.remove(index);
        
     }

}

function savesubjectintolocalstorage(){
    debugger;
   // alert("save subject into local storage");
    
     var arrsubject=getsubjectdatafromlocalstorage("subjectname");
    
     
    var newsubjectname=$("#txtsubject").val();
    newsubjectname=newsubjectname.toUpperCase();
    newsubjectname=newsubjectname.trim();
   // alert(arrsubject);
   // alert(arrsubject.length);

    if(newsubjectname=="")
    {
        if(flag==false)
        return;
    }
    

    if(isValueInList(newsubjectname,"subjectname"))
    {
        alert("This subject is already added.");
        removeoption("subjectname","ddselectsubject");
        appendoption("subjectname","ddselectsubject");
        return;
    }
    

//alert(newsubjectname+"==="+arrsubject);

arrsubject.push(newsubjectname);
 
    localStorage.setItem("subjectname",JSON.stringify(arrsubject));

 removeoption("subjectname","ddselectsubject");
appendoption("subjectname","ddselectsubject");


}

function isValueInList(valuetocheck,localstoragekey){
    debugger;
    
    if(getdatafromlocalstorage(localstoragekey) == null || getdatafromlocalstorage(localstoragekey) ==undefined)
    return;
    var subject1=getdatafromlocalstorage(localstoragekey);
   // alert(subject1);
        for (let index = 0; index < subject1.length; index++) {
            if(subject1[index]==valuetocheck){
                return true;
            }
            
        }
        return false;
    
    }

    function getsubjectdatafromlocalstorage(dataname){
        debugger;
        var data=localStorage.getItem(dataname);
        if (data==null || data==undefined) 
        {
        var arr=[];
        return arr;
        }
            
    
            var arr=JSON.parse(data);
            return arr;
            
        
    }

    function countrystate(){
       // alert("countrystate fire");
        var countrydata=getdatafromlocalstorage("countryname");
       // alert(countrydata.length);
        removeoption("countryname","ddcountry")
        appendoption("countryname","ddcountry");
    }

var arrformdetails=[];

    function formDetails(){
    // alert("formdetails fire");
    
        var object={
            studentname:$("#txtname").val(),
            studentemail:$("#txtemail").val(),
            studentcountry:$("#ddcountry").val(),
            studentstate:$("#ddstate").val(),
            studentsubject:$("#ddselectsubject").val(),
            studentmarks:$("#txtaddmarks").val()

        }
        // alert(object.studentname);
        // alert(object.studentemail);
        // alert(object.studentcountry);
        // alert(object.studentstate);
        // alert(object.studentsubject);
        // alert(object.studentmarks);

        // return object;
        if(flag==true)
        {
           arrformdetails[index]=object;
        }
        else{
            //validation code can be drop here....
            
            arrformdetails.push(object);
        }
       
       localStorage.setItem("studentdetails",JSON.stringify(arrformdetails));
       appendTableRows();
       flag=false;


    }


        //----------------append table rows function----------
function appendTableRows(){
    
    //alert("append table row fire");
    debugger;
    var data=localStorage.getItem("studentdetails");
    if (data!=null && data!=undefined ) {
        
        arrformdetails=JSON.parse(data);
        
    }
    
    
     //alert(arrformdetails.length);
    if(arrformdetails.length>=0 && arrformdetails!=null)
    {
    let storedata=``;
    for (let index = 0; index < arrformdetails.length; index++) {
    //    if(arr[index]==null)
    //    {
    //        continue;
    //    }
    //     else
    //     {
           storedata+=`<tr>
           <td>${arrformdetails[index].studentname}</td>
           <td>${arrformdetails[index].studentemail}</td>
           <td>${arrformdetails[index].studentcountry}</td>
           <td>${arrformdetails[index].studentstate}</td>
           <td>${arrformdetails[index].studentsubject}</td>
           <td>${arrformdetails[index].studentmarks}</td>
           <td>
           <a href="#" onclick="doupdate(${index})">update</a>
           </td>
           <td>
           <a href="#" onclick="dodelete(${index})">delete</a>
           </td>
           </tr>`
           
      // }
       
    }
    document.getElementById("tablebody").innerHTML=storedata;
    }
    
    }

    //----------------do delete function----------

function dodelete(i){
   // alert("dodelete fire");
    arrformdetails.splice(i,1);
    localStorage.setItem("studentdetails",JSON.stringify(arrformdetails));
    appendTableRows();
}
//---------------end-do delete function----------

//----------------do update function----------
var flag=false;
var index=0;
function doupdate(i){
    flag=true;
    index=i;
    //alert("doupdate fire "+i);
    debugger;
    // document.getElementById("dynamicphone").innerHTML="";
    //document.getElementById("divid").innerHTML="";
    var x=arrformdetails[i];
    
    $("#txtname").val(x.studentname);
    $("#txtemail").val(x.studentemail);
    $("#ddcountry").val(x.studentcountry);
    
    changecountry();
    $("#ddstate").val(x.studentstate);
    savesubjectintolocalstorage();
    $("#ddselectsubject").val(x.studentsubject);
    $("#txtaddmarks").val(x.studentmarks);

    
}

//end do update function

//auto complete
$(function(){

    var data=localStorage.getItem("subjectname");
    if (data!=null && data!=undefined ) {
        
        arrsubject=JSON.parse(data);
        
    }


    $("#txtsubject").autocomplete({
        // source:availabletags
        source:arrsubject
    });

});    
