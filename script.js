(function () {
    let tasks = [];

    const add = document.getElementById('add');
    const taskCount = document.getElementById('tasks-counter');
    const tasksList = document.getElementById('list');

    // Check We Fetch Elements Successfully or Not
    /*
    console.log(taskList)
    console.log(taskCount)
    console.log(add);
    */


    // Functions

    // Adding a Taks
    function addTask(task) {
        // Now Post Data TO the Server Using API
        if (!task) {
            showNotification('Task Can Not Added');
            return;
        }
        //First Fetch Data From server With API
        /*
        // All Code is Comment Out Because API we Use that Server Not Support any Post Request
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            tasks.push(task);
            showNotification('Task Added Successfully');
            renderList();
        }).catch((error)=>{
            console.log('error', error);
        })
        */
        addTask(task);
        tasks.push(task);
        showNotification('Task Added Successfully');
        renderList();
    }

    // Delete a Task
    function deleteTask(taskId) {
        const new_task = tasks.filter((task) => {         //Passing Task in Argument Because Search in Only Task Object in the Tasks Array
            return task.id != taskId;
        });

        tasks = new_task;
        showNotification('Task Deleted SuccessFully');
        renderList();
    }

    // Mark Task as Complete
    function toggleTask(taskId) {
        let selectTask = tasks.filter((task) => {
            return task.id == Number(taskId);                   //Because taskId is string and when we fetch data id on server is Number
        })

        if (selectTask.length > 0) {
            const curTask = selectTask[0];
            curTask.completed = !curTask.completed;
            showNotification('Task Toggeled Successfully');
            return;
        }
        showNotification('Something went Wrong');

    }

    // Refresh Page Every Time After Adding or Delete Task
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.innerHTML =
            `<input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="trash-solid.svg" class="delete" data-id="${task.id}" />`;
        tasksList.append(li);
    }


    function renderList() {
        tasksList.innerHTML = '';
        for (let i = 0; i < tasks.length; i++) {
            addTaskToDOM(tasks[i]);
        }
        taskCount.innerText = tasks.length;
    }

    // Show Notification that task is Added or deleted, Mark Successfully
    function showNotification(massage) {
        window.alert(massage);
    }

    function handleInputKeyPress(e) {
        if (e.key == 'Enter') {
            let text = e.target.value;

            // If User Press Enter WithOut Add Any Task
            if (!text) {
                showNotification('Task Can Not Be Empty')
                return;
            }

            const task = {
                title: text,               //Change for API
                // text,                   //means text : text
                id: Date.now().toString(),         // Best Way to Give ID
                // done: false
                completed: false,           //Change For API
            }
            e.target.value = '';
            addTask(task);
        }
    }


    // Instead of Adding Event Listner For Every Event in Web Page Add Event Delegation
    // Event Delegation Means Add A Single Event Listner to Whole Document and Inside the Listener We Find Out Where User is Clicked

    function handleInputClicks(e) {
        const target = e.target;
        if (target.className == 'delete') {
            const taskId = target.getAttribute('data-id');
            // const taskId = target.dataset.id;                    //Also Use This
            deleteTask(taskId);
            return;
        } else if (target.className == 'custom-checkbox') {
            const taskId = target.getAttribute('data-id');
            // const taskId = target.dataset.id;                    //Also Use This
            toggleTask(taskId);
            return;
        }
    }
    async function fetchTodoS() {
        // Every Time You Use aync await Keyword Always Use try and catch to prevent Code Break
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/todos');           // For Using Await Function Should be Async
            let data = await response.json();
            tasks = data;
            renderList();
        } catch (error) {
            console.log('error', error);
        }

        //For getRequest You Need to Pass URL
        // var promise = fetch('https://jsonplaceholder.typicode.com/todos')                        //fetch function return a promise  

        // var responseData = promise.then((response) => {
        //     return response.json();                                                             // response.json also returns promise
        // })

        // responseData.then((data) => {                                                           // call then function for fulfiled promise
        //     tasks = data.slice(0, 10);
        //     renderList();
        // })

        // responseData.catch((error)=>{
        //     console.log('error',error);                                                         // call catch function for edge case if something went wrong
        // })
        /*
            Instead of Using This Above is Used
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(
                (response) => {                                                                 //response same as resolve
                    // console.log(response);
                    // console.log(response.json());
                    return response.json();                                     // .jason function returns a promise with contain data
                })
            .then((data) => {
                tasks = data;
                renderList();
    
            })
            .catch((error) => {
                console.log('error', error);
            })
            */
    }
    function initialize() {
        // You Need to change Code Structure to API Structure in API Calls
        fetchTodoS();
        add.addEventListener('keyup', handleInputKeyPress);
        document.addEventListener('click', handleInputClicks);
    }

    initialize();


    // We Use fetch Keyword to fetch the API
    // fetch API gives us capability to get request and send request from the server or to the server
})()