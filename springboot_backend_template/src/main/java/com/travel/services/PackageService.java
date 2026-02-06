package com.travel.services;

import com.travel.dtos.PackageDto;
import com.travel.entities.Packages;
import java.util.List;

public interface PackageService {
    PackageDto createPackage(Packages pkg, Long vendorId);

    List<PackageDto> getAllPackages();

    void deletePackage(Long id);

    PackageDto getPackageById(Long id);

    // Search packages by name/place
    List<PackageDto> searchPackages(String query);
}