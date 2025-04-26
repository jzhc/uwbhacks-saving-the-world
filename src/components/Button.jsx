export default function Button({ onClick, children, variant = 'primary' }) {
  const base = "px-4 py-2 rounded-lg font-medium transition";
  const styles = variant === 'primary'
    ? "bg-[#1873D3] text-white hover:bg-[#020082]"
    : "bg-[#00004E] text-white hover:bg-[#1873D3]";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>{children}</button>
  );
}