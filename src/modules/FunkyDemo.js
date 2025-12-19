function FunkyDemo() {
  return (
    <div className="funky-demo">
      <div style={{ animation: "spin 2s linear infinite", fontSize: "50px" }}>🎉</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(90deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <h1 style={{ color: "purple", textAlign: "center" }}>Welcome to the Demo Mode!</h1>
      <p style={{ color: "orange", textAlign: "center" }}>This is a funky demo mode!</p>
      <p style={{ color: "white", textAlign: "center" }}>Enjoy this funky feature!</p>          
      <div style={{ animation: "spin 2s linear infinite", fontSize: "50px" }}>🎉</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default FunkyDemo;
