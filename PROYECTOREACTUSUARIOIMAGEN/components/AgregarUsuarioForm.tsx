import React, { useState, FormEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  useTheme,
  alpha,
  Fade,
  IconButton,
  Avatar,
  styled,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  PhotoCamera as PhotoCameraIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

interface Props {
  onSubmit: (formData: FormData) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  backdropFilter: 'blur(20px)',
  boxShadow: `0 20px 60px -10px ${alpha(theme.palette.primary.main, 0.3)}`,
  position: 'relative'
}));

const AgregarUsuarioForm: React.FC<Props> = ({ onSubmit }) => {
  const theme = useTheme();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    if (foto) formData.append('foto', foto);
    onSubmit(formData);
    
    // Limpiar formulario después del envío
    setNombre('');
    setApellido('');
    setEmail('');
    setFoto(null);
    setFotoPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFoto(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFotoPreview(null);
    }
  };

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      sx={{ mb: 4 }}
    >
      <Fade in={true} timeout={600}>
        <StyledCard sx={{ width: '100%', maxWidth: 600 }}>
          <CardContent sx={{ p: 4 }}>

            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box display="flex" alignItems="center" gap={3}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: fotoPreview ? 'transparent' : alpha(theme.palette.primary.main, 0.1),
                      border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}
                    src={fotoPreview || undefined}
                  >
                    {!fotoPreview && (nombre && apellido ? getInitials(nombre, apellido) : <PersonIcon />)}
                  </Avatar>
                  
                  <Box>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          backgroundColor: alpha(theme.palette.primary.main, 0.05)
                        }
                      }}
                    >
                      Subir Foto
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </Box>
                </Box>

                {/* Campos del formulario */}
                <Box display="flex" gap={2}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2,
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.primary.main,
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2,
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.primary.main,
                      }
                    }}
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: theme.palette.primary.main }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                        borderWidth: 2,
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.palette.primary.main,
                    }
                  }}
                />

                {/* Botón de envío */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.5)}`,
                    }
                  }}
                >
                  Registrar Cliente
                </Button>
              </Box>
            </form>
          </CardContent>
        </StyledCard>
      </Fade>
    </Box>
  );
};

export default AgregarUsuarioForm;