export const getBuilding = (sala: string): string => {
  const roomNumber = parseInt(sala, 10);
  
  if (roomNumber >= 1 && roomNumber <= 5) {
    return '1';
  } else if (roomNumber >= 6 && roomNumber <= 10) {
    return '2';
  } else if (roomNumber >= 11 && roomNumber <= 15) {
    return '3';
  } else {
    return 'Desconhecido';
  }
};