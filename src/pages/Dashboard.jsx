import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Fade } from '@mui/material';
import { Link } from 'react-router-dom';

const features = [
  {
    title: "Today's Medicines",
    desc: "2 medicines scheduled for today.",
    link: "/medicine-tracker",
    btn: "View Medicine Tracker",
    color: "#43e97b"
  },
  {
    title: "Recent Symptom Checks",
    desc: "Last check: No major symptoms detected.",
    link: "/symptom-checker",
    btn: "Check Symptoms",
    color: "#009efd"
  },
  {
    title: "Nearby Clinics",
    desc: "3 clinics within 5km.",
    link: "/clinics-nearby",
    btn: "Find Clinics",
    color: "#f7971e"
  },
  {
    title: "Profile & Settings",
    desc: "Update your preferences and profile.",
    link: "/settings",
    btn: "Go to Settings",
    color: "#a770ef"
  }
];

export default function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 4, md: 8 },
        px: { xs: 1, md: 0 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, #e0f7fa 0%, #f8ffae 100%)`,
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `url("data:image/svg+xml,%3Csvg width='1200' height='800' viewBox='0 0 1200 800' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='1000' cy='150' rx='320' ry='180' fill='%2343e97b' fill-opacity='0.13'/%3E%3Cellipse cx='300' cy='700' rx='360' ry='160' fill='%23009efd' fill-opacity='0.10'/%3E%3C/svg%3E") center/cover no-repeat`,
        },
      }}
    >
      {/* Hackathon badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 32,
          left: { xs: 16, md: 64 },
          bgcolor: '#43e97b',
          color: 'white',
          px: 2.5,
          py: 0.5,
          borderRadius: 2,
          fontFamily: '"Fira Mono", monospace',
          fontWeight: 700,
          fontSize: { xs: 14, md: 16 },
          letterSpacing: 2,
          boxShadow: 3,
          zIndex: 2,
          textTransform: 'uppercase',
          opacity: 0.95,
        }}
      >
        Hackathon Mode
      </Box>

      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          mx: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Fade in timeout={1200}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 5,
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.55)',
              borderRadius: 4,
              boxShadow: 4,
              px: { xs: 2, md: 6 },
              py: { xs: 3, md: 4 },
              animation: 'popTitle 1.2s cubic-bezier(.68,-0.55,.27,1.55) 1',
              '@keyframes popTitle': {
                '0%': { transform: 'scale(0.8)', opacity: 0 },
                '60%': { transform: 'scale(1.08)', opacity: 1 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          >
            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                color: 'primary.main',
                mb: 1,
                fontFamily: '"Montserrat", "Arial", sans-serif',
                letterSpacing: 1,
                textShadow: '0 2px 12px #43e97b33',
              }}
            >
              Welcome to Your Dashboard
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
                fontFamily: '"Fira Mono", monospace',
                fontWeight: 500,
                letterSpacing: 0.5,
                mb: 1,
              }}
            >
              Quick overview of your health activities and shortcuts.
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} key={f.title}>
              <Fade in timeout={1000 + i * 200}>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 6,
                    background: `rgba(255,255,255,0.65)`,
                    backdropFilter: 'blur(12px)',
                    border: `2px solid ${f.color}33`,
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.03) rotate(-1deg)',
                      boxShadow: 12,
                      borderColor: f.color,
                      background: `rgba(255,255,255,0.85)`,
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: f.color,
                        mb: 1,
                        letterSpacing: 0.5,
                        fontFamily: '"Montserrat", Arial, sans-serif',
                        textShadow: `0 2px 8px ${f.color}22`,
                      }}
                    >
                      {f.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {f.desc}
                    </Typography>
                    <Button
                      component={Link}
                      to={f.link}
                      variant="contained"
                      sx={{
                        background: `linear-gradient(90deg, ${f.color} 60%, #fff176 100%)`,
                        color: '#222',
                        fontWeight: 700,
                        borderRadius: 2,
                        boxShadow: '0 2px 8px #43e97b22',
                        textTransform: 'none',
                        '&:hover': {
                          background: `linear-gradient(90deg, #fff176 0%, ${f.color} 100%)`,
                          color: '#111',
                        },
                      }}
                    >
                      {f.btn}
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}