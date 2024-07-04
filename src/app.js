const express = require('express');
const app = express();

app.use(express.json());

let students = [];

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: 'no se encontro el estudiante' });
    res.json(student);
});

app.post('/students', (req, res) => {
    const id = new Date().getTime();
    const { fullName, age, curse } = req.body;
    if (!fullName || !age || !curse) return res.status(400).json({ message: 'campos obligatorios' });

    const newStudent = { id, fullName, age, curse };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ message: 'no se encontro el estudiante' });

    const { fullName, age, curse } = req.body;
    if (fullName) student.fullName = fullName;
    if (age) student.age = age;
    if (curse) student.curse = curse;

    res.json(student);
});

app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'no se encuentra el estudiante' });

    students.splice(index, 1);
    res.status(204).end();
});

app.listen(4321, () => console.log('Server running on port 4321'));