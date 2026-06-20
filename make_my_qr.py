import qrcode # Change line 1 back to this!

# The URL to your Netlify wedding registry app
url = "https://weddingregistrybo.netlify.app"

# Generate the QR code matrix
qr = qrcode.QRCode(version=1, box_size=10, border=5)
qr.add_data(url)
qr.make(fit=True)

# Save it as an image file
img = qr.make_image(fill_color="black", back_color="white")
img.save("wedding_registry_qr.png")
print("QR Code successfully saved as wedding_registry_qr.png!")