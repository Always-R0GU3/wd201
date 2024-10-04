
const todoList=require("../todo")

const {all,markAsComplete,add}=todoList()

describe("TodoList Test Suite",() => {

    beforeAll(() => {
        add({
            title: "Test todo",
            completed: false,
            dueDate: new Date().toISOString().slice(0, 10)
        })
    })

    test("Should Add new Todo",() => {
            const todoItemsCount=all.length
            add({
                title:"Test todo",
                completed:false,
                dueDate: new Date().toISOString().slice(0,10)
            })
            expect(all.length).toBe(todoItemsCount+1)
    })

    test("Should mark a todo as Complete",() => {
        expect(all[0].completed).toBe(false)
        markAsComplete(0)
        expect(all[0].completed).toBe(true)
    })
})