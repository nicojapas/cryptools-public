import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Switch from "@mui/material/Switch";
import { SettingsState, SettingsProps } from "../../utils/types";

export const SettingsDialog = ({ settingsState, setSettingsState, setSettingsButton }: SettingsProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettingsState({
      ...settingsState,
      [event.target.name]: event.target.checked,
    });
  };

  const SettingsButton = () => (
    <IconButton onClick={() => setOpen(true)} size="large" color="inherit" sx={{ justifyContent: "right" }}>
      <SettingsIcon />
    </IconButton>
  );

  useEffect(() => {
    setSettingsButton(SettingsButton);
  }, [setSettingsButton]);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{ mb: 2 }}>Settings</FormLabel>
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
            <FormHelperText></FormHelperText>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}; 