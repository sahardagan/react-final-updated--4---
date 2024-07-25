import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { CardContext, CardContextType } from "../../context/CardContext";
import { FormData } from "../../interfaces/cards";

interface CreateCardProps {
  open: boolean;
  handleClose: () => void;
}

const CreateCardForm: React.FC<CreateCardProps> = ({ open, handleClose }) => {
  const { addCard } = useContext(CardContext) as CardContextType;
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prevState) => {
      const newState = { ...prevState };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let currentLevel: any = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!currentLevel[keys[i]]) {
          currentLevel[keys[i]] = {};
        }
        currentLevel = currentLevel[keys[i]];
      }

      currentLevel[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleSubmit = async () => {
    try {
      await addCard(formData); // Update the context with the new card
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error creating card", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Card</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Web"
          name="web"
          value={formData.web}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Image URL"
          name="image.url"
          value={formData.image.url}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Image Alt"
          name="image.alt"
          value={formData.image.alt}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="State"
          name="address.state"
          value={formData.address.state}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Country"
          name="address.country"
          value={formData.address.country}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="City"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Street"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="House Number"
          name="address.houseNumber"
          value={formData.address.houseNumber}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Zip"
          name="address.zip"
          value={formData.address.zip}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCardForm;
