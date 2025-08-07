let user=[];
let editId=null;
let uId=localStorage.getItem("uId")?JSON.parse(localStorage.getItem("uId")):0;
showList();

function store(){
    localStorage.setItem("report",JSON.stringify(user));
}

function getReport(){
    let data=localStorage.getItem("report");
    if(data){
        user=JSON.parse(data);
    }
}

function showList(){
    
    getReport();
      let show = document.querySelector(".show")

    show.innerHTML= user.map((item,index)=>{
        if(editId===item.id){
          return`
            <tr  class="${item.result==="Pass"?"passRow":"failRow"}">
            <td>${index+1}</td>
            <td><input type="text" id="editInput" value="${item.name}" ></td>
            <td>
            <label for="editOption">
             <select id="editOption">
             <option value="">-Select-</option>
             <option value="Pass" ${item.result==="Pass"?"selected":""}  >Pass</option>
             <option value="Fail" ${item.result==="Fail"?"selected":""}  >Fail</option>
             </select>
            </label>
            </td>
            <td class="action" ><button id="saveBtn" onclick="saveEdit(${item.id})" >save</button>
                <button id="cancleBtn" onclick="cancleEdit()" >cancel</button>
            </td>
            </tr>
            `

        }
        else
        {        
        return`
        <tr class="${item.result==="Pass"?"passRow":"failRow"}" >
        <td>${index+1}</td>
        <td>${item.name}</td>
        <td>${item.result}</td>
        <td class="action">  <button id="deleteBtn" onclick="deleteItem(${item.id})" >Delete</button> 
        <button id="editBtn" onclick="editItem(${item.id})" >Edit</button> 
        </td>        
        </tr>       
   `    }

    }).join("")

}

    
 

    function addItem(){
        const obj={};
        const list=document.getElementById("inp");
        const res=document.getElementById("result");
        if(list.value=="" || res.value==""){
            alert("Please Fill out both the Feilds");
            return;
        }
        obj.name=list.value;
        obj.result=res.value;
        uId++;
        localStorage.setItem("uId",JSON.stringify(uId));
        obj.id=uId;
        user.push(obj);
        store();
        list.value="";
        res.value="";
        showList();
     
    }

    function deleteItem(id){
        user=user.filter((u)=>u.id!==id);
        store();
        showList();
    }

    function editItem(id){
       
        editId=id;
        showList();
    }


    function cancleEdit(){
        editId=null;
        showList();
    }


    function saveEdit(id){
        let item=user.find(u=>u.id===id);
        let name=document.getElementById("editInput").value;
        let result=document.getElementById("editOption").value;
        if(name===""|| result===""){
             alert("Please Fill out both the Feilds");
             showList();
            return;
        }
        item.name=name;
        item.result=result;
        store();
        editId=null;
        showList();
    }
