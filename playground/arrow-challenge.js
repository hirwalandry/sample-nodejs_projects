const tasks = {
    tasks:[{
        text:'grocery shopping',
        completed: false
    },
    {
        text:'clean yeard',
        completed: true
      
    },
    {
        text:'film course',
        completed: true
       
    }],
    getTaskToDo() {
        const taskToDo = this.tasks.filter((note) => {
            return note.completed === true;
        });

        return taskToDo;
    }
    
}
console.log(tasks.getTaskToDo());

const events = {
    name: "birthday",
    guestList: ["jules", "landry", "lionel"],
    allowed(){
        console.log("here who allowed to enter in our " + this.name + " party:");

        this.guestList.forEach((guest) => {
            console.log(guest + " is allowed in our " + this.name + "-party");
        })
    }
}
console.log(events.allowed())