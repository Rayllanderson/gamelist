package com.rayllanderson.gamelist.domain.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    public void sendEmail(String to, String body, String title) {
        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        System.out.println(body);
        try {
            // true = multipart message
            helper = new MimeMessageHelper(msg, true);

            helper.setTo(to);

            helper.setSubject(title);
            helper.setText(body, true);
            javaMailSender.send(msg);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendResetPassEmail(String to, String newPassword) {
        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(msg, true);
            helper.setTo(to);
            String message = "<h3>Nova senha: " + newPassword +" </h3>";
            message += "<br><p>Acesse sua conta e mude a senha.</p>";
            message+= "<br><small>Caso não tenha sido você, acesse sua conta e mude sua senha.</small>";
            helper.setSubject("Recuperação de senha");
            helper.setText(message, true);
            javaMailSender.send(msg);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
