const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

let tasks = [
  {
    id: '1',
    title: 'Learn TypeScript',
    description: 'Study TypeScript fundamentals',
    done: false
  },
  {
    id: '2',
    title: 'Build API',
    description: 'Create a RESTful API with Node.js',
    done: true
  }
]

app.get('/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/tasks', (req, res) => {
  const { title, description } = req.body

  // Basic validation
  if (!title || typeof title !== 'string' || title.length > 100) {
    return res.status(400).json({ error: 'Invalid title' })
  }

  if (description && (typeof description !== 'string' || description.length > 500)) {
    return res.status(400).json({ error: 'Invalid description' })
  }

  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    done: false
  }

  tasks.push(newTask)
  res.status(201).json(newTask)
})

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id
  const { done } = req.body

  if (typeof done !== 'boolean') {
    return res.status(400).json({ error: 'Invalid done status' })
  }

  const taskIndex = tasks.findIndex(task => task.id === taskId)

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  tasks[taskIndex].done = done
  res.json(tasks[taskIndex])
})

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id
  const initialLength = tasks.length

  tasks = tasks.filter(task => task.id !== taskId)

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' })
  }

  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
