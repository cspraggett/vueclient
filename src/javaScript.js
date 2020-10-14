var message = new Vue({
    el: '#message',
    data: {
        date: '',
        hour: '',
        minutes: '',
        seconds: '',
        display: '',
        interval: 0
    },
   mounted() {
        this.interval = setInterval(this.updateDate, 1000);
   },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        updateDate() {
            const currDate = new Date();
            this.date = currDate.toDateString();
            this.hour = currDate.getHours();
            this.minutes = currDate.getMinutes();
            this.seconds = currDate.getSeconds();
            this.display = `${this.date} ${this.hour}:${this.minutes}:${this.seconds}`;
        }
    }
})

    var department = new Vue({
    el: '#departments',
    data: {
    depts: [],
    failure: false
},
    mounted: function () {
    this.getDepartments();
},
    methods: {
    getDepartments: function() {
    const request = `${window.Configs.host}/departments`
    const requestOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
};
    fetch(request, requestOptions)
    .then(response => {
    if (response.status === 200) {
    console.log('hello')
    return response.json();
} else {
    console.log('response: ', response.text())
    throw response.text();
}
})

    .then(data => {
    console.log('data: ', data.body)
    return this.depts = data})
    .catch(error => {
    this.failure = true;
    if (error instanceof Promise) {
    error.then(errorMessage => {
    console.warn(errorMessage)
});
} else {
    console.warn (error);
}
});

}
}
})

    var employees = new Vue({
    el: '#employees',
    data: {
    employees: '',
    gender: '',
    hireDate: '',
    failure: false
},
    methods: {
    getEmployees: function(gender, hireDate) {
    const request = `${window.Configs.host}/employees?gender=${this.gender}&hire_date=${this.hireDate}`
    const requestOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
};
    fetch(request, requestOptions)
    .then(response => {
    if (response.status === 200) {
    return response.json();
} else {
    throw response.text();
}
})
    .then(data => {
    return this.employees = data})
    .catch(error => {
    this.failure = true;
    if (error instanceof Promise) {
    error.then(errorMessage => {
    console.warn(errorMessage)
});
} else {
    console.warn (error);
}
})
}
}
})
    var createEmployee = new Vue({
    el: '#create-employee',
    data: {
    empNo: '',
    birthDate: '',
    firstName: '',
    lastName: '',
    gender: '',
    hireDate: '',
    success: false,
    failure: false,
},
    methods: {
    createEmployee: function() {
    const request = new Request(`${window.Configs.host}/employees`);
    const requestOptions = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
},
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    body: JSON.stringify({
    emp_no: this.empNo,
    birth_date: this.birthDate,
    first_name: this.firstName,
    last_name: this.lastName,
    gender: this.gender,
    hire_date: this.hireDate
})
};
    fetch(request, requestOptions)
    .then(response => {
    console.log('status', response.status)
    if (response.status === 200){
    return response.text();
}
    else {
    throw response.text();
}
})
    .then(results => {
    console.log(results);
    this.success = true
    this.failure = false
})
    .catch(error => {
    this.success = false
    this.failure = true

    if (error instanceof Promise) {
    error.then(errorMessage => {
    console.warn(errorMessage);
});
}
    else {
    console.warn(error);
}
});
}
}
})