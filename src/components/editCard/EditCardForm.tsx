// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { TextField, Button, Grid, Typography, Box } from "@mui/material";
// import { FormData } from "../../interfaces/cards";

// const EditCardForm: React.FC<{ defaultValues: FormData }> = ({
//   defaultValues,
// }) => {
//   const { handleSubmit, control } = useForm<FormData>({
//     defaultValues,
//   });

//   const onSubmit = (data: FormData) => {
//     console.log(data);
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h4" gutterBottom>
//         Edit Card
//       </Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Controller
//               name="title"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Title"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="subtitle"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Subtitle"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="description"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Description"
//                   multiline
//                   rows={4}
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="phone"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Phone"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="email"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Email"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="web"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Web"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="image.url"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Image URL"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="image.alt"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Image Alt Text"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="address.state"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="State"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="address.country"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Country"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="address.city"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="City"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="address.street"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Street"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="address.houseNumber"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="House Number"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Controller
//               name="address.zip"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Zip Code"
//                   fullWidth
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default EditCardForm;

import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Card, FormData } from "../../interfaces/cards";
import { CardContext, CardContextType } from "../../context/CardContext";

interface EditCardFormProps {
  defaultValues: Card;
  open: boolean;
  handleClose: () => void;
}

const EditCardForm: React.FC<EditCardFormProps> = ({
  defaultValues,
  open,
  handleClose,
}) => {
  const newValues: FormData = {
    title: defaultValues.title,
    subtitle: defaultValues.subtitle,
    description: defaultValues.description,
    phone: defaultValues.phone,
    email: defaultValues.email,
    web: defaultValues.web,
    image: { url: defaultValues.image.url, alt: defaultValues.image.alt },
    address: {
      state: defaultValues.address.state,
      country: defaultValues.address.country,
      city: defaultValues.address.city,
      street: defaultValues.address.street,
      houseNumber: defaultValues.address.houseNumber,
      zip: defaultValues.address.zip,
    },
  };
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: newValues,
  });
  const { updateCard } = useContext(CardContext) as CardContextType;

  const onSubmit = (data: FormData) => {
    // @ts-ignore

    updateCard(data, defaultValues._id);
    handleClose();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Card</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="subtitle"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subtitle"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="web"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Web"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="image.url"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Image URL"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="image.alt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Image Alt Text"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.houseNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="House Number"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.zip"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Zip Code"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCardForm;
