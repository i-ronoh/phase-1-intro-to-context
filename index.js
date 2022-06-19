function createEmployeeRecord(employeeDetails){
    let employeeRecord = {
        firstName : employeeDetails[0],
        familyName : employeeDetails[1],
        title : employeeDetails[2],
        payPerHour : employeeDetails[3],
        timeInEvents : [],
        timeOutEvents : [] 
    }
    return employeeRecord;
}

function createEmployeeRecords(records){
    let employeeRecords = records.map(record => createEmployeeRecord(record))
    return employeeRecords
}

function createTimeInEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type : "TimeIn",
        hour: parseInt(hour,10),
        date,
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour : parseInt(hour, 10),
        date
    })

    return employee
}

function hoursWorkedOnDate(employee, dateWorked){
    let inTheEvent = employee.timeInEvents.find((e)=>{
        return e.date === dateWorked
    })

    let outOfTheEvent = employee.timeOutEvents.find((e)=>{
        return e.date === dateWorked
    })

    return (outOfTheEvent.hour - inTheEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateWorked){
    let wageEarned = hoursWorkedOnDate(employee, dateWorked) * employee.payPerHour
    return parseFloat(wageEarned.toString())
}

function allWagesFor(employee){
    let eligbleDates = employee.timeInEvents.map((e)=>{
        return e.date
    })

    let amountPayable = eligbleDates.reduce((memo, d)=>{
        return memo + wagesEarnedOnDate(employee,d)
    }, 0)

    return amountPayable
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((memo, rec)=>{
        return memo + allWagesFor(rec)
    }, 0)
}