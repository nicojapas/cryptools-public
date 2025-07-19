import { useState, useEffect, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import { SettingsProps } from "../../utils/types";
import { StyledIconButton } from "./SettingsDialog.styles";

export const SettingsDialog = ({ settingsState, setSettingsState, setSettingsButton }: SettingsProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettingsState({
      ...settingsState,
      [event.target.name]: event.target.checked,
    });
  };

  // Create the settings button
  const SettingsButton = useCallback(() => (
    <StyledIconButton 
      onClick={() => setOpen(true)} 
      size="large" 
      aria-label="Open settings dialog"
    >
      <SettingsIcon />
    </StyledIconButton>
  ), []);

  // Set the settings button when component mounts
  useEffect(() => {
    setSettingsButton(<SettingsButton />);
    
    // Cleanup when component unmounts
    return () => {
      setSettingsButton(undefined);
    };
  }, [setSettingsButton]);

  return (
    <>
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        aria-labelledby="settings-dialog-title"
        aria-describedby="settings-dialog-description"
      >
        <DialogContent>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" id="settings-dialog-title" sx={{ mb: 2 }}>Settings</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={settingsState.stable} onChange={handleChange} name="stable" />}
                label="Stable Coins"
              />
              <FormControlLabel
                control={<Switch checked={settingsState.wrapped} onChange={handleChange} name="wrapped" />}
                label="Wrapped"
              />
            </FormGroup>
            <FormHelperText id="settings-dialog-description">Configure display settings for cryptocurrency data</FormHelperText>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}; 