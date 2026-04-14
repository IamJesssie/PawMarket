import FormField from './FormField';
import RadioGroup from './RadioGroup';
import styles from './GroomingComponents.module.css';

const petTypeOptions = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  { value: 'other', label: 'Other' }
];

const PetDetailsForm = ({ values, onChange }) => {
  return (
    <div className={styles.detailCard}>
      <div className={styles.petDetailsGrid}>
        <FormField
          label="Select Pet (Optional)"
          name="selectedPet"
          placeholder="e.g. Buddy"
          value={values.selectedPet}
          onChange={onChange}
        />

        <FormField
          label="Pet Name"
          name="petName"
          placeholder="e.g. Buddy"
          value={values.petName}
          onChange={onChange}
        />

        <RadioGroup
          label="Pet Type"
          name="petType"
          options={petTypeOptions}
          selectedValue={values.petType}
          onChange={onChange}
        />

        <FormField
          label="Breed"
          name="breed"
          placeholder="e.g. Golden Retriever"
          value={values.breed}
          onChange={onChange}
        />

        <FormField
          label="Pet Age"
          name="petAge"
          placeholder="e.g. 3 years"
          value={values.petAge}
          onChange={onChange}
        />

        <label htmlFor="specialInstructions" className={styles.fieldGroup}>
          <span className={styles.fieldLabel}>Special Instructions</span>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            placeholder="Allergies, behavior notes..."
            value={values.specialInstructions}
            onChange={onChange}
            className={styles.textArea}
          />
        </label>
      </div>
    </div>
  );
};

export default PetDetailsForm;
