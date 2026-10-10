package com.retrotrade.controller;

import com.retrotrade.dto.AdminMetricsDTO;
import com.retrotrade.exception.UnauthorizedException;
import com.retrotrade.service.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminDashboardService adminDashboardService;

    public AdminController(AdminDashboardService adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    /**
     * Route 15: Telemetria e metriche globali aggregate riservate a ROLE_ADMIN.
     * Esempio: GET /api/admin/metrics
     */
    @GetMapping("/metrics")
    public ResponseEntity<AdminMetricsDTO> getMetrics(
            @RequestHeader(value = "X-User-Role", defaultValue = "ROLE_USER") String role
    ) {
        if (!"ROLE_ADMIN".equalsIgnoreCase(role)) {
            throw new UnauthorizedException("Accesso negato: risorsa riservata agli amministratori (ROLE_ADMIN).");
        }
        AdminMetricsDTO metrics = adminDashboardService.getMetrics();
        return ResponseEntity.ok(metrics);
    }
}
