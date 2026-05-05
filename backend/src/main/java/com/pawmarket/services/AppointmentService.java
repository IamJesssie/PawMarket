package com.pawmarket.services;

import com.pawmarket.models.Appointment;
import com.pawmarket.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByUserId(UUID userId) {
        return appointmentRepository.findByUserId(userId);
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long id, Appointment appointmentDetails) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        appointment.setAppointmentDate(appointmentDetails.getAppointmentDate());
        appointment.setAppointmentTime(appointmentDetails.getAppointmentTime());
        appointment.setPetName(appointmentDetails.getPetName());
        appointment.setPetType(appointmentDetails.getPetType());
        appointment.setBreed(appointmentDetails.getBreed());
        appointment.setPetAge(appointmentDetails.getPetAge());
        appointment.setSpecialInstructions(appointmentDetails.getSpecialInstructions());
        appointment.setStatus(appointmentDetails.getStatus());
        appointment.setTotalPrice(appointmentDetails.getTotalPrice());
        appointment.setAddons(appointmentDetails.getAddons());

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
}
