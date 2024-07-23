import React, { useContext } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUserForm } from "../../interfaces/users";
import { UserContext, UserContextType } from "../../context/UserContext";

const SignupPage: React.FC = () => {
  const { signup } = useContext(UserContext) as UserContextType;
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<IUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",
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
      isAdmin: false,
      isBusiness: false,
      classCode: "",
    },
  });

  const onSubmit: SubmitHandler<IUserForm> = (data) => {
    console.log(data);
    signup(data);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom></Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="name.first"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="name.middle"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Middle Name"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="name.last"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="image.url"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="image.alt"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Image Alt Text"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.state"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="State"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.country"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Country"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.city"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="City"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.street"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Street"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.houseNumber"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="House Number"
                    type="number"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.zip"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="ZIP Code"
                    type="number"
                    variant="outlined"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="isBusiness"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Business Account"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
