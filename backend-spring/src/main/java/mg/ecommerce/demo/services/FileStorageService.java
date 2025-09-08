package mg.ecommerce.demo.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path uploadDir = Paths.get("uploads");

    public FileStorageService() {
        try {
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
        } catch (IOException e) {
            throw new RuntimeException("Impossible de créer le dossier d'upload", e);
        }
    }

    public void delete(String filePath) {
        if (filePath == null || filePath.isEmpty())
            return;

        try {
            // extraire juste le nom du fichier
            String fileName = Paths.get(filePath).getFileName().toString();

            // construire le chemin réel sur le disque
            Path destinationFile = uploadDir.resolve(fileName).normalize();

            File file = destinationFile.toFile();

            if (file.exists()) {
                boolean deleted = file.delete();
                if (!deleted) {
                    System.out.println("Impossible de supprimer le fichier : " + file.getAbsolutePath());
                } else {
                    System.out.println("Fichier supprimé : " + file.getAbsolutePath());
                }
            } else {
                System.out.println("Fichier non trouvé : " + file.getAbsolutePath());
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de la suppression du fichier : " + filePath, e);
        }
    }

    /**
     * Sauvegarde un fichier sur le disque et retourne son URL publique
     */
    public String save(MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Fichier vide : " + file.getOriginalFilename());
        }

        try {
            // Générer un nom unique
            String extension = getFileExtension(file.getOriginalFilename());
            String fileName = UUID.randomUUID().toString() + (extension.isEmpty() ? "" : "." + extension);

            // Chemin réel sur le disque
            Path destinationFile = uploadDir.resolve(fileName).normalize();

            // Copier le fichier
            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

            // Retourner URL publique correspondant au dossier exposé
            return "/uploads/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la sauvegarde du fichier " + file.getOriginalFilename(), e);
        }
    }

    /**
     * Récupère l’extension d’un fichier
     */
    private String getFileExtension(String fileName) {
        if (fileName != null && fileName.contains(".")) {
            return fileName.substring(fileName.lastIndexOf(".") + 1);
        }
        return "";
    }
}
