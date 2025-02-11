const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const config = require('./config');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10; // กำหนดจำนวนรอบของการเข้ารหัส


app.use(cors()); // เปิดใช้งาน CORS
app.use(express.json()); // รองรับ JSON body

const pool = mysql.createPool({
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


const port = config.express.port;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get("/smartphones", async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM smartphones");
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Error fetching smartphones", details: err.message });
    }
});

app.post('/smartphones/create/', async (req, res) => {
    const params = req.body;
    try {
        const insertSQL = "INSERT INTO smartphones (brand, model, price, support5G, processorBrand, batteryCapacity, ramCapacity, internalMemory, screenSize, refreshRate, os) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const [result] = await pool.query(insertSQL, [params.brand, params.model, params.price, params.support5G, params.processorBrand, params.batteryCapacity, params.ramCapacity, params.internalMemory, params.screenSize, params.refreshRate, params.os]);
        const readSQL = "SELECT * FROM smartphones";
        const [results] = await pool.query(readSQL);
        res.status(200).send(results);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send("Backend error!");
    }
});

app.put('/smartphones/update/', async (req, res) => {
    const params = req.body;
    try {
        const updateSQL = "UPDATE smartphones SET brand = ?, model = ?, price = ?, support5G = ?, processorBrand = ?, batteryCapacity = ?, ramCapacity = ?, internalMemory = ?, screenSize = ?, refreshRate = ?, os = ? WHERE id = ?";
        const [result] = await pool.query(updateSQL, [params.brand, params.model, params.price, params.support5G, params.processorBrand, params.batteryCapacity, params.ramCapacity, params.internalMemory, params.screenSize, params.refreshRate, params.os, params.id]);
        const readSQL = "SELECT * FROM smartphones";
        const [results] = await pool.query(readSQL);
        res.status(200).send(results);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send("Backend error!");
    }
});

app.delete('/smartphones/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteSQL = "DELETE FROM smartphones WHERE id = ?";
        const [result] = await pool.query(deleteSQL, [id]);
        const readSQL = "SELECT * FROM smartphones";
        const [results] = await pool.query(readSQL);
        res.status(200).send(results);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send("Backend error!");
    }
});

// Login API
app.post('/login', async (req, res) => { // API สำหรับการเข้าสู่ระบบ
    const { user, pass } = req.body; // รับข้อมูล username และ password จาก request body

    try { // เริ่มต้นการดักจับข้อผิดพลาด
        const [results] = await pool.query("SELECT * FROM users WHERE username = ? AND password = ?", [user, pass]); // ค้นหาผู้ใช้ในฐานข้อมูล
        if (results.length > 0) { // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
            res.json({ success: true, message: "Login successful" }); // ส่งข้อความยืนยันการเข้าสู่ระบบ
        } else { // เมื่อข้อมูลไม่ถูกต้อง
            res.status(401).json({ success: false, message: "Invalid username or password" }); // ส่งข้อความข้อผิดพลาด
        }
    } catch (err) { // กรณีเกิดข้อผิดพลาด
        res.status(500).json({ success: false, message: "Login failed", details: err.message }); // ส่งข้อความข้อผิดพลาดกลับ
    }
});

// Register API
app.post('/register', async (req, res) => { // API สำหรับการสมัครสมาชิก
    const { user, pass } = req.body; // รับข้อมูล username และ password จาก request body
    console.log("Username:", user); // แสดง username ใน console
    console.log("Password:", pass); // แสดง password ใน console

    if (!user || !pass) { // ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
        return res.status(400).json({ success: false, message: "Fill Username and Password" }); // ส่งข้อความข้อผิดพลาดเมื่อข้อมูลไม่ครบ
    }
    const registerSQL = "INSERT INTO users (username, password) VALUES (?, ?)"; // คำสั่ง SQL สำหรับเพิ่มข้อมูลผู้ใช้ใหม่
    try { // เริ่มต้นการดักจับข้อผิดพลาด
        const [results] = await pool.query(registerSQL, [user, pass]); // เพิ่มข้อมูลผู้ใช้ใหม่ในฐานข้อมูล
        res.status(201).json({ success: true }); // ส่งข้อความยืนยันการสมัครสมาชิก
    } catch (err) { // กรณีเกิดข้อผิดพลาด
        console.error("Unexpected error:", err); // แสดงข้อผิดพลาดใน console
        res.status(500).json({ success: false, message: "Unexpected error occurred." }); // ส่งข้อความข้อผิดพลาดกลับ
    }
});