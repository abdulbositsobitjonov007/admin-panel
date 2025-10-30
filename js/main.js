let tbody = document.getElementById("tbody");
let formModal = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal");
let addStudent = document.getElementById("add-student");
let selectedUser = null;
let nam = document.getElementById("nam");
let sur = document.getElementById("sur");
let sel = document.getElementById("sel");
let wor = document.getElementById("wor");
let changeBtn = document.getElementById("change-btn");
let selectFilter = document.getElementById("select-filter")


let thead = document.getElementById("thead");




let students = JSON.parse(localStorage.getItem("students") || "[]");

localStorage.setItem("students", JSON.stringify(students));

function getStudents(content, data) {
    content.innerHTML = "";
    data.map((el , index) => {
        content.innerHTML +=
            `
        <tr
                                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 text-[18px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${index + 1}
                                </th>
                                <th scope="row" class="px-6 py-4 text-[18px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${el.firstname}
                                </th>
                                <td class="px-6 py-4 text-[18px]">
                                    ${el.lastname}
                                </td>
                                <td class="px-6 py-4 text-[18px]">
                                    ${el.group}
                                </td>
                                <td class="px-6 py-4 text-[18px]">
                                    ${el.iswork ? "Yes" : "No"}
                                </td>
                                <td class="px-6 py-4 flex gap-[10px]">
                                    <button onClick="editStudent(${el.id})" class="text-[18px] font-[500] hover:underline duration-300 text-[blue] cursor-pointer">EDIT</button>
                                    <button onClick="deleteStudent(${el.id})" class="text-[18px] font-[500] hover:underline duration-300 text-[red] cursor-pointer">REMOVE</button>
                                </td>
                            </tr>
        `
    })
}

getStudents(tbody, students);

formModal.addEventListener("submit" , function(e){
    e.preventDefault();
    let obj = {};

    if(selectedUser){

        students = students.map((el) => {

        if(el.id === selectedUser){
            el.id = students.length + 1;
            el.firstname = e.target[0].value;
            el.lastname = e.target[1].value;
            el.group = e.target[2].value;
            el.iswork = e.target[3].checked;  
        }
        return el
    })
    }else{
        obj.id = students.length + 1;
    obj.firstname = e.target[0].value;
    obj.lastname = e.target[1].value;
    obj.group = e.target[2].value;
    obj.iswork = e.target[3].checked;

    students.push(obj);
    }

    
    localStorage.setItem("students", JSON.stringify(students));
    getStudents(tbody, students);
    outerModal.classList.add("hidden")
    selectedUser  = null
})

outerModal.addEventListener("click", function(){
    outerModal.classList.add("hidden");
    selectedUser = null

});

innerModal.addEventListener("click" , function(e){
    e.stopPropagation();
})

addStudent.addEventListener("click", function(){
    changeBtn.textContent = "Add";
    outerModal.classList.remove("hidden");
    
})

function deleteStudent(id){
    students = students.filter((el) => el.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
    getStudents(tbody, students);
}

function editStudent(id){
    selectedUser = id;
    changeBtn.textContent = "Edit"
    outerModal.classList.remove("hidden");
    let object = students.filter((el) => el.id === id);
    nam.value = object.firstname;
    sur.value = object.lastname;
    sel.value = object.group;
    wor.value = object.iswork;
}

selectFilter.addEventListener("click", function(e){
    let filterGroup = e.target.value;

    if(filterGroup === "All"){
        filtered = students;
    }else{
        filtered = students.filter((el) => el.group === filterGroup);
    }

    getStudents(tbody, filtered);
});
let searchProduct = document.getElementById("search");
searchProduct.addEventListener("input", function (e) {
    tbody.innerHTML = "";
    let searchValue = e.target.value;


    searchProduct = students.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase()));
    searchStudents(tbody, searchProducts)
})

    function searchStudents(content, data) {
        content.innerHTML = "";
        data.map((el) => {
            content.innerHTML +=
                `
        <tr
                                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                <th scope="row" class="px-6 py-4 text-[18px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${index + 1}
                                </th>
                                <th scope="row" class="px-6 py-4 text-[18px] font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${el.firstname}
                                </th>
                                <td class="px-6 py-4 text-[18px]">
                                    ${el.lastname}
                                </td>
                                <td class="px-6 py-4 text-[18px]">
                                    ${el.group}
                                </td>
                                <td class="px-6 py-4 text-[18px]">
                                    ${el.iswork ? "Yes" : "No"}
                                </td>
                                <td class="px-6 py-4 flex gap-[10px]">
                                    <button onClick="editStudent(${el.id})" class="text-[18px] font-[500] hover:underline duration-300 text-[blue] cursor-pointer">EDIT</button>
                                    <button onClick="deleteStudent(${el.id})" class="text-[18px] font-[500] hover:underline duration-300 text-[red] cursor-pointer">REMOVE</button>
                                </td>
                            </tr>
        `
        });
    }


searchStudents(tbody, searchProduct)