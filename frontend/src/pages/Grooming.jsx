import { useMemo, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import BookingStepper from '../components/Grooming/BookingStepper';
import ServiceCard from '../components/Grooming/ServiceCard';
import AddonCard from '../components/Grooming/AddonCard';
import SidebarDetails from '../components/Grooming/SidebarDetails';
import CalendarPicker from '../components/Grooming/CalendarPicker';
import TimeSlotList from '../components/Grooming/TimeSlotList';
import PetDetailsForm from '../components/Grooming/PetDetailsForm';
import BookingSummary from '../components/Grooming/BookingSummary';
import OrderStatus from '../components/ShoppingCart/OrderStatus';
import GroomingGallery from '../components/Grooming/GroomingGallery';
import styles from '../components/Grooming/GroomingComponents.module.css';

const progressSteps = [
  { label: 'Select Service' },
  { label: 'Choose Date & Time' },
  { label: 'Pet Details' },
  { label: 'Payment Method' },
  { label: 'Confirm & Pay' }
];

const imageSalon = 'https://www.figma.com/api/mcp/asset/22f058fe-c165-4690-9e07-df2d42f18c10';

const timeSlots = [
  { label: '9:00 AM', value: '9:00 AM' },
  { label: '9:30 AM', value: '9:30 AM' },
  { label: '10:00 AM', value: '10:00 AM' },
  { label: '10:30 AM', value: '10:30 AM' },
  { label: '11:00 AM', value: '11:00 AM' },
  { label: '11:30 AM', value: '11:30 AM' },
  { label: '1:00 PM', value: '1:00 PM' },
  { label: '1:30 PM', value: '1:30 PM', disabled: true },
  { label: '2:00 PM', value: '2:00 PM' },
  { label: '2:30 PM', value: '2:30 PM' },
  { label: '3:00 PM', value: '3:00 PM' },
  { label: '3:30 PM', value: '3:30 PM', disabled: true },
  { label: '4:00 PM', value: '4:00 PM' },
  { label: '4:30 PM', value: '4:30 PM' }
];

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const buildCalendarDays = (month, selectedDate) => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const firstWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = new Date(2026, 2, 15);

  const grid = [];
  for (let i = 0; i < firstWeekday; i += 1) {
    grid.push({ key: `blank-${i}`, label: '', disabled: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, monthIndex, day);
    grid.push({
      key: `day-${day}`,
      label: day,
      date,
      disabled: date < today,
      isSelected: selectedDate?.getDate() === day && selectedDate?.getMonth() === monthIndex && selectedDate?.getFullYear() === year
    });
  }

  return grid;
};

const Grooming = () => {
  const { user, isAuthenticated } = useAuth();
  const { loyaltyPoints, useLoyaltyPoints } = useOrder();
  const navigate = useNavigate();

  const [serviceOptions, setServiceOptions] = useState([]);
  const [addonOptions, setAddonOptions] = useState([]);
  
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [step, setStep] = useState(1);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 15));
  const [selectedTime, setSelectedTime] = useState('9:00 AM');
  const [paymentMethod, setPaymentMethod] = useState('pay_in_store');
  const [appointmentId, setAppointmentId] = useState(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [petDetails, setPetDetails] = useState({
    selectedPet: '',
    petName: '',
    petType: 'dog',
    breed: '',
    petAge: '',
    specialInstructions: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const [servicesRes, addonsRes] = await Promise.all([
          fetch('http://localhost:8080/api/grooming/services'),
          fetch('http://localhost:8080/api/grooming/addons')
        ]);
        
        if (servicesRes.ok && addonsRes.ok) {
          const servicesData = await servicesRes.json();
          const addonsData = await addonsRes.json();
          setServiceOptions(servicesData);
          setAddonOptions(addonsData);
          if (servicesData.length > 0) {
            setSelectedServiceId(servicesData[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load grooming services", err);
      }
    };
    fetchServices();
  }, []);

  const selectedService = serviceOptions.find((option) => option.id === selectedServiceId);

  const estimatedTotal = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = addonOptions.find((option) => option.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return (selectedService?.price || 0) + addonsTotal;
  }, [selectedService, selectedAddons, addonOptions]);

  const calendarDays = useMemo(
    () => buildCalendarDays(calendarMonth, selectedDate),
    [calendarMonth, selectedDate]
  );

  const toggleAddon = (id) => {
    setSelectedAddons((current) =>
      current.includes(id) ? current.filter((addonId) => addonId !== id) : [...current, id]
    );
  };

  const handlePetDetailChange = (event) => {
    const { name, value } = event.target;
    setPetDetails((current) => ({
      ...current,
      [name]: value
    }));
  };

  const goToNextStep = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (step < 5) {
      setStep((current) => current + 1);
      return;
    }

    setIsSubmitting(true);

    let finalTotal = estimatedTotal;
    let loyaltyDiscount = 0;

    if (paymentMethod === 'loyalty_points') {
      const pointsNeeded = Math.ceil(estimatedTotal / 10) * 2;
      if (loyaltyPoints >= pointsNeeded) {
        useLoyaltyPoints(pointsNeeded);
        loyaltyDiscount = Math.floor(pointsNeeded / 2) * 10;
        finalTotal = estimatedTotal - loyaltyDiscount;
      }
    }

    try {
      const payload = {
        userId: user.id,
        service: { id: selectedServiceId },
        appointmentDate: selectedDate.toISOString().split('T')[0],
        appointmentTime: selectedTime,
        petName: petDetails.petName || 'My Pet',
        petType: petDetails.petType,
        breed: petDetails.breed,
        petAge: petDetails.petAge,
        specialInstructions: petDetails.specialInstructions,
        totalPrice: finalTotal,
        addons: selectedAddons.map(id => ({ id }))
      };

      const response = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const newAppt = await response.json();
        setAppointmentId(`#APT-${newAppt.id}`);
        setShowOrderStatus(true);
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Network error during booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToPreviousStep = () => {
    setStep((current) => Math.max(1, current - 1));
  };

  const stepTitle =
    step === 1
      ? 'Select Grooming Service'
      : step === 2
      ? 'Choose Date & Time'
      : step === 3
      ? 'Pet Details'
      : step === 4
      ? 'Payment Method'
      : 'Confirm & Pay';
  const stepLabel = `Step ${step}`;

  if (showOrderStatus && appointmentId) {
    return (
      <div className={styles.groomingPage}>
        <OrderStatus
          orderId={appointmentId}
          onClose={() => {
            setShowOrderStatus(false);
            setAppointmentId(null);
            setStep(1);
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.groomingPage}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.breadcrumb}>Home › Grooming › Book Appointment</p>
          <h1 className={styles.pageTitle}>Book a Grooming Appointment</h1>
        </div>
        <BookingStepper steps={progressSteps} currentStep={step} />
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.leftColumn}>
          <section className={styles.sectionBlock}>
            <div className={styles.sectionLabel}>{stepLabel}</div>
            <h2 className={styles.sectionTitle}>{stepTitle}</h2>

            {step === 1 ? (
              <>
                <div className={styles.serviceGrid}>
                  {serviceOptions.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      selected={service.id === selectedServiceId}
                      onSelect={setSelectedServiceId}
                    />
                  ))}
                </div>
                <section className={styles.sectionBlock}>
                  <p className={styles.sectionLabel}>Optional Add-ons</p>
                  <div className={styles.addonGrid}>
                    {addonOptions.map((addon) => (
                      <AddonCard
                        key={addon.id}
                        addon={addon}
                        selected={selectedAddons.includes(addon.id)}
                        onToggle={toggleAddon}
                      />
                    ))}
                  </div>
                </section>
              </>
            ) : step === 2 ? (
              <div className={styles.stepTwoLayout}>
                <CalendarPicker
                  monthLabel={`${monthNames[calendarMonth.getMonth()]} ${calendarMonth.getFullYear()}`}
                  days={calendarDays}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  onPrevMonth={() => setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                  onNextMonth={() => setCalendarMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                />
                <TimeSlotList
                  slots={timeSlots}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              </div>
            ) : step === 3 ? (
              <PetDetailsForm values={petDetails} onChange={handlePetDetailChange} />
            ) : step === 4 ? (
              <div className={styles.paymentMethodSection}>
                <h3>Select Payment Method</h3>
                <div className={styles.paymentOptions}>
                  <div className={styles.paymentOption}>
                    <input
                      type="radio"
                      id="pay_in_store"
                      name="paymentMethod"
                      value="pay_in_store"
                      checked={paymentMethod === 'pay_in_store'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="pay_in_store" className={styles.paymentLabel}>
                      <div className={styles.paymentInfo}>
                        <span className={styles.paymentTitle}>Pay in Store</span>
                        <span className={styles.paymentDescription}>Pay when you arrive for your appointment</span>
                      </div>
                    </label>
                  </div>

                  {loyaltyPoints >= Math.ceil(estimatedTotal / 10) * 2 && (
                    <div className={styles.paymentOption}>
                      <input
                        type="radio"
                        id="loyalty_points"
                        name="paymentMethod"
                        value="loyalty_points"
                        checked={paymentMethod === 'loyalty_points'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="loyalty_points" className={styles.paymentLabel}>
                        <div className={styles.paymentInfo}>
                          <span className={styles.paymentTitle}>Use Loyalty Points</span>
                          <span className={styles.paymentDescription}>
                            Use {Math.ceil(estimatedTotal / 10) * 2} points (₱{Math.floor((Math.ceil(estimatedTotal / 10) * 2) / 2) * 10} discount)
                          </span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                <div className={styles.totalSummary}>
                  <div className={styles.totalRow}>
                    <span>Service Total:</span>
                    <span>₱{estimatedTotal.toLocaleString()}</span>
                  </div>
                  {paymentMethod === 'loyalty_points' && (
                    <div className={styles.totalRow}>
                      <span>Loyalty Discount:</span>
                      <span className={styles.discount}>-₱{Math.floor((Math.ceil(estimatedTotal / 10) * 2) / 2) * 10}</span>
                    </div>
                  )}
                  <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                    <span>Total to Pay:</span>
                    <span>
                      {paymentMethod === 'loyalty_points'
                        ? `₱${(estimatedTotal - Math.floor((Math.ceil(estimatedTotal / 10) * 2) / 2) * 10).toLocaleString()}`
                        : `₱${estimatedTotal.toLocaleString()}`
                      }
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <BookingSummary
                service={selectedService}
                addons={selectedAddons.map((id) => addonOptions.find((option) => option.id === id)?.name).filter(Boolean)}
                date={selectedDate}
                time={selectedTime}
                petDetails={petDetails}
                total={estimatedTotal}
                paymentMethod={paymentMethod}
              />
            )}
          </section>
        </div>

        <SidebarDetails image={imageSalon} total={estimatedTotal} />
      </div>

      <div className={styles.buttonRow}>
        {step > 1 && (
          <button type="button" className={styles.secondaryButton} onClick={goToPreviousStep} disabled={isSubmitting}>
            ← Back
          </button>
        )}
        <button type="button" className={styles.ctaButton} onClick={goToNextStep} disabled={isSubmitting || serviceOptions.length === 0}>
          {isSubmitting ? 'Processing...' : (step === 1
            ? 'Continue to Date & Time →'
            : step === 2
            ? 'Continue to Pet Details →'
            : step === 3
            ? 'Review & Confirm →'
            : 'Confirm Appointment & Pay')}
        </button>
      </div>

      <GroomingGallery />
    </div>
  );
};

export default Grooming;