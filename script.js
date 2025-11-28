function saveAttendance(roll, status) {
    let attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    if (!attendance[roll]) {
        attendance[roll] = { present: 0, absent: 0 };
    }
    if (status === "Present") attendance[roll].present++;
    else attendance[roll].absent++;
    localStorage.setItem("attendance", JSON.stringify(attendance));
    let msg = document.getElementById("msg");
    msg.innerHTML = "✔ Attendance Saved Successfully!";
    msg.style.opacity = "1";

    setTimeout(() => {
        msg.style.opacity = "0";
    }, 2000);
}
if (document.getElementById("reportBody")) {
    let attendance = JSON.parse(localStorage.getItem("attendance")) || {};
    let students = [
        { name: "Mano", roll: "CS23101" },
        { name: "Madhavan", roll: "CS23102" },
        { name: "Sanjay", roll: "CS23103" }
    ];
    let html = "";
    students.forEach(student => {
        let data = attendance[student.roll] || { present: 0, absent: 0 };
        let total = data.present + data.absent;
        let percent = total === 0 ? 0 : Math.round((data.present / total) * 100);
        html += `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${data.present}</td>
                <td>${data.absent}</td>
                <td>${percent}%</td>
            </tr>
        `;
    });
    document.getElementById("reportBody").innerHTML = html;
}