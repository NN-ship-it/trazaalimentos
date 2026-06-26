package com.trazaalimentos.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Component;
import java.io.ByteArrayOutputStream;
import java.util.Base64;

@Component
public class QRCodeGenerator {
    
    private static final int WIDTH = 300;
    private static final int HEIGHT = 300;
    
    public String generarCodigoQR(String datos) throws Exception {
        MultiFormatWriter writer = new MultiFormatWriter();
        BitMatrix bitMatrix = writer.encode(datos, BarcodeFormat.QR_CODE, WIDTH, HEIGHT);
        
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
        
        byte[] imageBytes = outputStream.toByteArray();
        return Base64.getEncoder().encodeToString(imageBytes);
    }
    
    public String generarURLQR(String codigoProducto) {
        return "http://localhost:3000/producto/" + codigoProducto;
    }
}
