document.addEventListener('DOMContentLoaded', async function (event) {

  let db = firebase.firestore()

  // Step 1: Make the world's tiniest to-do app
  document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault()
    console.log("form was submitted");

    let todoText = document.querySelector("#todo").value
    console.log(todoText);


    if (todoText.length > 0) {
      document.querySelector(".todos").insertAdjacentHTML("beforeend",
        `
          <div class="py-4 text-xl border-b-2 border-purple-500 w-full">
            ${todoText}
          </div>
        `
      )
      document.querySelector("#todo").value = ""

      let docRef = await db.collection("todos").add({
        text: todoText
      })
      let todoId = docRef.id
    }
  })
  // Step 2: Read existing to-dos from Firestore
  let querySnapshot = await db.collection("todos").get()
  let todos = querySnapshot.docs
  for (let i = 0; i < todos.length; i++) {
    let todoID = todos[i].id
    let todoData = todos[i].data()
    let todoText = todoData.text
    document.querySelector(".todos").insertAdjacentHTML("beforeend",
      `
        <div class="py-4 text-xl border-b-2 border-purple-500 w-full">
          ${todoText}
        </div>
      `
    )
  }
  // Step 3: Add code to Step 1 to add todo to Firestore
  // Step 4: Add code to allow completing todos
})