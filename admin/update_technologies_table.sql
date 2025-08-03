--- Add type field to technologies table
ALTER TABLE technologies 
ADD COLUMN type ENUM('core', 'future') DEFAULT 'core' AFTER image;

-- Update any existing records to set a default type
UPDATE technologies SET type = 'core'; 