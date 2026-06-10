# 🌸 Wedding RSVP & Registry Website

Welcome to our wedding website repository! This project serves as a digital invitation where guests can easily submit their RSVPs, access our Amazon Registry, or view our Venmo Honeyfund via a simple QR code scan.

## 🛠️ Project Structure
* `index.html` - The public-facing guest RSVP portal.
* `style.css` - Custom elegant wedding theme styles with papyrus texture and vine framing.
* `script.js` - Front-end guest list matching and live Google Sheets API syncing.
* `admin.html` - Private tracking dashboard to check responses.

## 🚀 Live Deployment
This website is hosted live using **Netlify** and automatically redeploys changes whenever updates are pushed to the `main` branch on GitHub.

* **Live Guest Portal:** [https://weddingregistrybo.netlify.app](https://weddingregistrybo.netlify.app)

---

## 📊 Live Cloud Database
The RSVP submissions are wired to a central Google Sheet spreadsheet via Google Apps Script. 

* **Active Web App API Endpoint:** [https://script.google.com/macros/s/AKfycbzpOMYI5Wn29Kui31x15E7-asZQWEil2J6C6YIwR8q4PzyuTfh4Kdt29Fvlg-TSnJxX6g/exec](https://script.google.com/macros/s/AKfycbzpOMYI5Wn29Kui31x15E7-asZQWEil2J6C6YIwR8q4PzyuTfh4Kdt29Fvlg-TSnJxX6g/exec)
* **Google Script Deployment ID:** `AKfycbzpOMYI5Wn29Kui31x15E7-asZQWEil2J6C6YIwR8q4PzyuTfh4Kdt29Fvlg-TSnJxX6g`

---

## 🔒 Host/Organizer Access Only
* **Private Admin Dashboard:** [https://weddingregistrybo.netlify.app/admin.html](https://weddingregistrybo.netlify.app/admin.html)

> 💡 **Note:** Unlike the older version, this admin dashboard pulls data instantly from your live cloud spreadsheet. You can now open this dashboard on **any device** (phone, computer, tablet) anywhere in the world, and it will accurately reflect live submissions in real-time!