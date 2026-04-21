import { useMemo, useState } from 'react';
import { useOrder } from '../context/OrderContext';
import BookingStepper from '../components/Grooming/BookingStepper';
import ServiceCard from '../components/Grooming/ServiceCard';
import AddonCard from '../components/Grooming/AddonCard';
import SidebarDetails from '../components/Grooming/SidebarDetails';
import CalendarPicker from '../components/Grooming/CalendarPicker';
import TimeSlotList from '../components/Grooming/TimeSlotList';
import PetDetailsForm from '../components/Grooming/PetDetailsForm';
import BookingSummary from '../components/Grooming/BookingSummary';
import OrderStatus from '../components/ShoppingCart/OrderStatus';
import styles from '../components/Grooming/GroomingComponents.module.css';

const serviceOptions = [
  { id: 1, name: 'Full Grooming', duration: '2 - 3 hrs', price: 3500 },
  { id: 2, name: 'Bath & Dry', duration: '1 - 1.5 hrs', price: 1900 },
  { id: 3, name: 'Hair Trim & Styling', duration: '1 - 2 hrs', price: 2200 },
  { id: 4, name: 'Nail Clipping', duration: '15 min', price: 800 },
  { id: 5, name: 'Ear Cleaning', duration: '10 min', price: 650 },
  { id: 6, name: 'Teeth Brushing', duration: '15 min', price: 950 }
];

const addonOptions = [
  { id: 1, name: 'Flea Treatment', price: 1100 },
  { id: 2, name: 'Perfume Spritz', price: 250 },
  { id: 3, name: 'Paw Wax', price: 550 },
  { id: 4, name: 'Blueberry Facial', price: 800 },
  { id: 5, name: 'Tooth Brushing', price: 650 },
  { id: 6, name: 'De-shedding', price: 1350 }
];

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
  const { createOrder, loyaltyPoints, useLoyaltyPoints } = useOrder();
  const [selectedServiceId, setSelectedServiceId] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [step, setStep] = useState(1);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 2, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 15));
  const [selectedTime, setSelectedTime] = useState('9:00 AM');
  const [paymentMethod, setPaymentMethod] = useState('pay_in_store');
  const [orderId, setOrderId] = useState(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [petDetails, setPetDetails] = useState({
    selectedPet: '',
    petName: '',
    petType: 'dog',
    breed: '',
    petAge: '',
    specialInstructions: ''
  });

  const selectedService = serviceOptions.find((option) => option.id === selectedServiceId);

  const estimatedTotal = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = addonOptions.find((option) => option.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return (selectedService?.price || 0) + addonsTotal;
  }, [selectedService, selectedAddons]);

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

  const goToNextStep = () => {
    if (step < 5) {
      setStep((current) => current + 1);
      return;
    }

    // Step 5: Confirm appointment and create order
    let finalTotal = estimatedTotal;
    let loyaltyDiscount = 0;

    if (paymentMethod === 'loyalty_points') {
      const pointsNeeded = Math.ceil(estimatedTotal / 10) * 2; // 2 points = ₱10
      if (loyaltyPoints >= pointsNeeded) {
        useLoyaltyPoints(pointsNeeded);
        loyaltyDiscount = Math.floor(pointsNeeded / 2) * 10;
        finalTotal = estimatedTotal - loyaltyDiscount;
      }
    }

    const order = createOrder({
      type: 'grooming',
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      addons: selectedAddons.map((id) => addonOptions.find((option) => option.id === id)?.name).filter(Boolean),
      petDetails,
      paymentMethod,
      originalTotal: estimatedTotal,
      loyaltyDiscount,
      total: finalTotal
    });

    setOrderId(order);
    setShowOrderStatus(true);
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

  if (showOrderStatus && orderId) {
    return (
      <div className={styles.groomingPage}>
        <OrderStatus 
          orderId={orderId} 
          onClose={() => {
            setShowOrderStatus(false);
            setOrderId(null);
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
          <button type="button" className={styles.secondaryButton} onClick={goToPreviousStep}>
            ← Back
          </button>
        )}
        <button type="button" className={styles.ctaButton} onClick={goToNextStep}>
          {step === 1
            ? 'Continue to Date & Time →'
            : step === 2
            ? 'Continue to Pet Details →'
            : step === 3
            ? 'Review & Confirm →'
            : 'Confirm Appointment & Pay'}
        </button>
      </div>
    </div>
  );
};

export default Grooming;
