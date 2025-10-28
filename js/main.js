let tbody = document.getElementById("tbody");
let formModal = document.getElementById("form");
let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal");
let addStudent = document.getElementById("add-student");

let students = JSON.parse(localStorage.getItem("students") || "[]");

localStorage.setItem("students", JSON.stringify(students));

function getStudents(content, data) {
    content.innerHTML = "";
    data.map((el) => {
        content.innerHTML +=
            `
        <tr
                                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
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
                                    <button class="text-[18px] font-[500] hover:underline duration-300 text-[blue] cursor-pointer">EDIT</button>
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
    obj.id = students.length + 1;
    obj.firstname = e.target[0].value;
    obj.lastname = e.target[1].value;
    obj.group = e.target[2].value;
    obj.iswork = e.target[3].checked;

    students.push(obj);
    localStorage.setItem("students", JSON.stringify(students));
    getStudents(tbody, students);
    outerModal.classList.add("hidden")
})

outerModal.addEventListener("click", function(){
    outerModal.classList.add("hidden")
});

innerModal.addEventListener("click" , function(e){
    e.stopPropagation();
})

addStudent.addEventListener("click", function(){
    outerModal.classList.remove("hidden")
})

function deleteStudent(id){
    students = students.filter((el) => el.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
    getStudents(tbody, students);
}