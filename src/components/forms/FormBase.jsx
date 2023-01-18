const FormBase = ({ data, styles, register, errors }) => (
  <div className={styles.divContainer}>
    <div className={styles.divInput}>
      <label className={styles.label}>{data.label}</label>
      <input
        type={`${data.type}`}
        placeholder={`${data.placeholder}`}
        {...register(`${data.regist}`, {
          required: data.isRequired,
          pattern: data.isPattern,
          maxLength: data.isMaxLength,
          minLength: data.isMinLength,
        })}
        className={`${styles.input} ${
          errors?.[data.regist] && styles.inputError
        }`}
        disabled={data.isDisabled}
      />
    </div>
    <div className={styles.divErrores}>
      {errors[data.regist]?.type === "required" && (
        <span className={styles.errores}>Este campo es requerido.</span>
      )}
      {errors[data.regist]?.type === "pattern" && (
        <span className={styles.errores}>{data.patternMsg}</span>
      )}
      {(errors[data.regist]?.type === "minLength" ||
        errors[data.regist]?.type === "maxLength") && (
        <span className={styles.errores}>{data.lengthMsg}</span>
      )}
    </div>
  </div>
);

export default FormBase;
