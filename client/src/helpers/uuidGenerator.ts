export function generateUUID() {
    // Generate a random hexadecimal number with 4 digits
    function randomHex4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
  
    // Concatenate four random hexadecimal numbers separated by hyphens
    return (
      randomHex4() +
      randomHex4() +
      '-' +
      randomHex4() +
      '-' +
      randomHex4() +
      '-' +
      randomHex4() +
      '-' +
      randomHex4() +
      randomHex4() +
      randomHex4()
    );
  }
  
  // Example usage:
//   const uuid = generateUUID();
//   console.log(uuid);
  