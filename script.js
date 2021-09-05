
var countryarr=[];
var statearr=[];


//add country dropdown...................
function addcountry(){
    debugger;
    // alert("addcountry fired");
    var countryarr=getcountrydatafromlocalstorage("countryname");
    var newcountryname=$("#txtnewcountry").val();
    newcountryname=newcountryname.trim();
    if(newcountryname=="")
    return;
    newcountryname=newcountryname.toUpperCase();
   // alert(newcountryname);
    
    //alert(countryarr.length);
   if(isValueInList(newcountryname,"countryname"))
   {
       alert("This country is already added");
    return;
   }
   
    
    countryarr.push(newcountryname);
    
localStorage.setItem("countryname",JSON.stringify(countryarr));
removecountry("selectcountry");
appendcountry("countryname","#selectcountry");
alert("successfully add");
    
   
}



function getcountrydatafromlocalstorage(dataname){
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


function appendcountry(dataname,selectname)
{
    var countryarr=getcountrydatafromlocalstorage(dataname);

    //alert(countryarr.length);
     for (let index = 0; index < countryarr.length; index++) {
        var element=document.createElement('option');
        element.value=countryarr[index];
        element.text=countryarr[index];
        
       $(selectname).append(element);
        
     }

}

function removecountry(selectname)
{
    // getcountrydatafromlocalstorage();
    debugger;
   // alert("contry arr"+countryarr.length);
    var selectelement=document.getElementById(selectname);
    var optionlength=selectelement.options.length-1;
    //alert(optionlength);
     for (let index = optionlength; index >= 1; index--) {
      
        
       selectelement.remove(index);
        
     }

}

function isValueInList(valuetocheck,dataname){
var countryarr=getcountrydatafromlocalstorage(dataname);
    for (let index = 0; index < countryarr.length; index++) {
        if(countryarr[index]==valuetocheck){
            return true;
        }
        
    }
    return false;

}
//xxxxxxx add country dropdown...................

// add state dropdown...................

function getstatedatafromlocalstorage(selectedcountry){
    debugger;
    // var selectedcountry=$("#selectcountry").val();
    var data=localStorage.getItem(selectedcountry);
    if (data!=null && data!=undefined ) {
        
        statearr=JSON.parse(data);
        
    }
    
}


function addstate(){
    debugger;
    
    //alert("addstate fired");
    var selectedcountry=$("#selectcountry").val();
    
    if(selectedcountry=="SELECT")
    {
      //  alert("select");
        return;
    }
    var storagename=selectedcountry+"STATE";
    var statearr=getcountrydatafromlocalstorage(storagename);
    
    
    var newstatename=$("#txtnewstatename").val();
    newstatename=newstatename.trim();
    if(newstatename=="")
    {
        alert("please input state name...")
        return;
    }
    
    
    newstatename=newstatename.toUpperCase();
   // alert(newstatename);
    //alert(selectedcountry);
    

   if(isValueInList(newstatename,storagename))
   {
       alert("this state is already added...")
    return;
   }
    
   statearr.push(newstatename);
   localStorage.setItem(storagename,JSON.stringify(statearr));

   removecountry("selectstate");
   appendcountry(storagename,"#selectstate");
    
  alert("success...");
    
        
  
   
}

function changecountry(){
   // alert("changecountry fired");
    var selectedcountry=$("#selectcountry").val();
    var dataname=selectedcountry+"STATE";
    removecountry("selectstate");
    appendcountry(dataname,"#selectstate")
   // alert(selectedcountry);
    
}

//xxxxxxx add country dropdown...................