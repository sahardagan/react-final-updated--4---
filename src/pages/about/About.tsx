import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to BCard, your ultimate solution for creating, browsing, and
          managing business cards with ease. Our innovative platform is designed
          to cater to professionals and businesses of all sizes, offering a
          seamless and efficient way to handle all your business card needs.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          At BCard, we strive to simplify the way you network and manage your
          professional connections. Our mission is to provide a user-friendly,
          powerful tool that helps you create stunning business cards,
          efficiently manage your contacts, and enhance your professional
          presence.
        </Typography>

        <Typography variant="h5" gutterBottom>
          What We Offer
        </Typography>
        <Typography variant="h6" gutterBottom>
          Create
        </Typography>
        <Typography variant="body1" paragraph>
          Design unique and professional business cards effortlessly with our
          intuitive creation tools. Choose from a variety of templates,
          customize every detail, and ensure your business card stands out.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Browse
        </Typography>
        <Typography variant="body1" paragraph>
          Explore a wide range of business cards within our app. Find
          inspiration, discover new contacts, and connect with professionals
          from various industries.
        </Typography>

        <Typography variant="h6" gutterBottom>
          CRM for Admins
        </Typography>
        <Typography variant="body1" paragraph>
          Our comprehensive CRM features enable admins to manage business card
          data, users data, and maintain valuable business relationships. Stay
          on top of your networking game with advanced analytics and reporting
          tools.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          Email: BCard@email.com
        </Typography>
        <Typography variant="body1" paragraph>
          Phone: 123-456-7890
        </Typography>
        <Typography variant="body1" paragraph>
          Address: 1234 BCard St, BCard City, BCard Country
        </Typography>

        <Box sx={{ width: "100%", height: "400px", marginTop: 3 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.914138785164!2d-122.08424968468492!3d37.42206597982517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5f1d3df4b07%3A0x4a2a2a97e1a2e4c7!2sGoogleplex!5e0!3m2!1sen!2sus!4v1593451976951!5m2!1sen!2sus"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            //@ts-ignore
            tabIndex="0"
          ></iframe>
        </Box>

        <Box sx={{ marginTop: 3 }}>
          <Button variant="contained" color="primary" sx={{ margin: 1 }}>
            Contact Us
          </Button>
          <Button variant="contained" color="secondary" sx={{ margin: 1 }}>
            Feedback
          </Button>
          <Button variant="contained" color="info" sx={{ margin: 1 }}>
            Help
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutPage;
