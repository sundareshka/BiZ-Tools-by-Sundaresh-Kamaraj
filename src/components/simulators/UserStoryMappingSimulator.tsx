import { useState, useMemo } from 'react';
import { Layers, CheckCircle2, Sliders, ArrowRight, AlertTriangle, RotateCcw, Plus, HelpCircle, FileText, Sparkles, Building2, Eye, Compass, ShieldCheck } from 'lucide-react';

interface Story {
  id: string;
  activityId: string;
  title: string;
  userStory: string;
  acceptanceCriteria: {
    given: string;
    when: string;
    then: string;
  }[];
  slice: 'r1' | 'r2' | 'r3';
  estimatePts: number;
}

interface Activity {
  id: string;
  name: string;
  stepDescription: string;
  order: number;
}

const DEFAULT_ACTIVITIES: Activity[] = [
  { id: 'act-1', name: '1. Discover Clinic', stepDescription: 'Patient searches and finds healthcare provider', order: 1 },
  { id: 'act-2', name: '2. Book Slot', stepDescription: 'Selects doctor, date, and confirms appointment', order: 2 },
  { id: 'act-3', name: '3. Get Reminded', stepDescription: 'Receives notifications and preparation guidelines', order: 3 },
  { id: 'act-4', name: '4. Arrive & Check In', stepDescription: 'Enters clinic, marks presence, receives token', order: 4 },
  { id: 'act-5', name: '5. Consult Doctor', stepDescription: 'Doctor conducts examination and diagnosis', order: 5 },
  { id: 'act-6', name: '6. Payment & Invoicing', stepDescription: 'Settles consultation and lab fees', order: 6 },
  { id: 'act-7', name: '7. Follow-Up Care', stepDescription: 'Prescription download and next visit booking', order: 7 }
];

const DEFAULT_STORIES: Story[] = [
  // 1. Discover
  {
    id: 's-101',
    activityId: 'act-1',
    title: 'Search Clinic by Name / Area',
    userStory: 'As a patient, I want to search clinics by locality so that I can find healthcare near my home.',
    acceptanceCriteria: [
      { given: 'I am on the search home screen', when: 'I type "Anna Nagar"', then: 'I see all active partner clinics in that locality.' }
    ],
    slice: 'r1',
    estimatePts: 2
  },
  {
    id: 's-102',
    activityId: 'act-1',
    title: 'Filter by Specialization & Tamil Language',
    userStory: 'As a patient, I want to filter by doctors who speak Tamil so that I can communicate symptoms comfortably.',
    acceptanceCriteria: [
      { given: 'A list of search results', when: 'I apply the "Language: Tamil" filter', then: 'Only doctors fluent in Tamil are displayed.' }
    ],
    slice: 'r2',
    estimatePts: 3
  },
  {
    id: 's-103',
    activityId: 'act-1',
    title: 'GPS Real-Time Distance & Route Map',
    userStory: 'As a patient, I want to see live travel time and map navigation to the clinic so that I can plan my departure.',
    acceptanceCriteria: [
      { given: 'Location permissions granted', when: 'I view clinic profile', then: 'I see a dynamic Google Map with ETA.' }
    ],
    slice: 'r3',
    estimatePts: 5
  },

  // 2. Book
  {
    id: 's-201',
    activityId: 'act-2',
    title: 'Select Doctor & Time Slot',
    userStory: 'As a patient, I want to pick an available 15-minute slot so that I have a guaranteed consultation window.',
    acceptanceCriteria: [
      { given: 'A doctor calendar', when: 'I click a green available slot', then: 'The slot is reserved for 5 minutes during confirmation.' }
    ],
    slice: 'r1',
    estimatePts: 3
  },
  {
    id: 's-202',
    activityId: 'act-2',
    title: 'Self-Serve Reschedule / Cancel Flow',
    userStory: 'As a patient, I want to reschedule my appointment so that I do not lose my slot when my work plans change.',
    acceptanceCriteria: [
      { given: 'A confirmed appointment > 2 hours away', when: 'I choose "Reschedule"', then: 'Available slots for the next 7 days appear.' },
      { given: 'Appointment < 2 hours away', when: 'I choose "Reschedule"', then: 'System instructs me to phone the clinic desk directly.' }
    ],
    slice: 'r1', // Walking skeleton critical!
    estimatePts: 3
  },
  {
    id: 's-203',
    activityId: 'act-2',
    title: 'Family Multi-Member Profiles',
    userStory: 'As a parent, I want to book appointments for my elderly father from my account so that I can manage his healthcare.',
    acceptanceCriteria: [
      { given: 'My active account', when: 'I add a dependent family member', then: 'I can select their name during slot confirmation.' }
    ],
    slice: 'r2',
    estimatePts: 5
  },

  // 3. Remind
  {
    id: 's-301',
    activityId: 'act-3',
    title: 'Automated SMS Confirmation & Token',
    userStory: 'As a patient, I want an SMS confirmation with my booking token so that I have a written reference without an internet app.',
    acceptanceCriteria: [
      { given: 'A confirmed booking', when: 'Saved in database', then: 'An instant SMS with date, doctor, and token is dispatched.' }
    ],
    slice: 'r1',
    estimatePts: 1
  },
  {
    id: 's-302',
    activityId: 'act-3',
    title: 'WhatsApp Reminder 2 Hours Prior',
    userStory: 'As a patient, I want a WhatsApp reminder message 2 hours before my slot so that I leave home on time.',
    acceptanceCriteria: [
      { given: 'An upcoming appointment in 120 minutes', when: 'Cron triggers', then: 'A rich WhatsApp interactive template is sent.' }
    ],
    slice: 'r2',
    estimatePts: 2
  },

  // 4. Check In
  {
    id: 's-401',
    activityId: 'act-4',
    title: 'Receptionist Walk-In & Queue List',
    userStory: 'As a receptionist, I want to mark walk-in and online patients so that the queue sequence is unambiguous.',
    acceptanceCriteria: [
      { given: 'The clinic receptionist dashboard', when: 'A patient arrives', then: 'One click moves them from "Expected" to "Waiting".' }
    ],
    slice: 'r1',
    estimatePts: 3
  },
  {
    id: 's-402',
    activityId: 'act-4',
    title: 'Self-Serve QR Code Check-In Kiosk',
    userStory: 'As a patient, I want to scan a desk QR code on arrival so that I do not have to wait in line at the busy reception.',
    acceptanceCriteria: [
      { given: 'A patient with an active booking', when: 'They scan clinic entrance QR', then: 'They are auto-checked into the waiting room.' }
    ],
    slice: 'r2',
    estimatePts: 5
  },
  {
    id: 's-403',
    activityId: 'act-4',
    title: 'Live TV Waiting Room Queue Display',
    userStory: 'As a waiting patient, I want to see token numbers on a wall monitor so that I know how many patients are ahead of me.',
    acceptanceCriteria: [
      { given: 'A clinic waiting room display', when: 'Doctor completes a consult', then: 'Next token flashes on screen with a chime sound.' }
    ],
    slice: 'r3',
    estimatePts: 5
  },

  // 5. Consult
  {
    id: 's-501',
    activityId: 'act-5',
    title: 'Doctor Basic Status & Finish Button',
    userStory: 'As a doctor, I want to click "Next Patient" so that reception knows the consultation room is ready.',
    acceptanceCriteria: [
      { given: 'Doctor screen', when: 'Clicking "Finish Consultation"', then: 'Next queued patient is notified and current visit marked done.' }
    ],
    slice: 'r1',
    estimatePts: 2
  },
  {
    id: 's-502',
    activityId: 'act-5',
    title: 'Digital Prescription Pad & ICD-10 Coding',
    userStory: 'As a doctor, I want to type or select medicines with standard dosages so that patients get clear printed prescriptions.',
    acceptanceCriteria: [
      { given: 'An active consult', when: 'Doctor selects "Paracetamol 500mg BD 3 days"', then: 'Formatted prescription PDF is generated.' }
    ],
    slice: 'r2',
    estimatePts: 8
  },

  // 6. Payment
  {
    id: 's-601',
    activityId: 'act-6',
    title: 'Manual Cash / UPI at Reception',
    userStory: 'As a receptionist, I want to mark payment received in cash or QR scan so that accounts balance at day end.',
    acceptanceCriteria: [
      { given: 'Completed consult', when: 'Fee collected', then: 'Receipt number logged and printed.' }
    ],
    slice: 'r1',
    estimatePts: 2
  },
  {
    id: 's-602',
    activityId: 'act-6',
    title: 'In-App Online UPI Advance Payment',
    userStory: 'As a patient, I want to pay consultation fee during booking so that I do not spend time paying at the clinic desk.',
    acceptanceCriteria: [
      { given: 'Slot selected', when: 'Paid via Razorpay/PhonePe', then: 'Appointment confirmed with zero pending desk balance.' }
    ],
    slice: 'r2',
    estimatePts: 5
  },
  {
    id: 's-603',
    activityId: 'act-6',
    title: 'Insurance Cashless TPA Claims Portal',
    userStory: 'As an insured patient, I want to submit my Star Health policy for cashless approval directly through the app.',
    acceptanceCriteria: [
      { given: 'Policy document uploaded', when: 'TPA API approves claim', then: 'Patient co-pay is auto-calculated.' }
    ],
    slice: 'r3',
    estimatePts: 13
  },

  // 7. Follow Up
  {
    id: 's-701',
    activityId: 'act-7',
    title: 'SMS Link to View Prescription PDF',
    userStory: 'As a patient, I want an SMS link to download my prescription so that I can purchase medicines at any pharmacy.',
    acceptanceCriteria: [
      { given: 'Consultation ended', when: 'Prescription saved', then: 'Unique secure shortlink sent via SMS.' }
    ],
    slice: 'r1',
    estimatePts: 2
  },
  {
    id: 's-702',
    activityId: 'act-7',
    title: '1-Tap Follow-Up Booking in 7 Days',
    userStory: 'As a patient, I want a 1-tap reminder to book my free follow-up consultation within 7 days.',
    acceptanceCriteria: [
      { given: 'Doctor requested review', when: 'Patient clicks review reminder', then: 'Doctor schedule pre-fills with follow-up fee waived.' }
    ],
    slice: 'r2',
    estimatePts: 3
  },
  {
    id: 's-703',
    activityId: 'act-7',
    title: 'Loyalty Points & Family Wellness Pass',
    userStory: 'As a repeat patient, I want to earn loyalty reward credits on diagnostic tests to save money on preventive care.',
    acceptanceCriteria: [
      { given: 'Lab test purchased', when: 'Bill exceeds ₹1,000', then: '100 loyalty points credited to wallet.' }
    ],
    slice: 'r3',
    estimatePts: 8
  }
];

export function UserStoryMappingSimulator() {
  const [activities] = useState<Activity[]>(DEFAULT_ACTIVITIES);
  const [stories, setStories] = useState<Story[]>(DEFAULT_STORIES);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  // Stats
  const r1Stories = stories.filter(s => s.slice === 'r1');
  const r2Stories = stories.filter(s => s.slice === 'r2');
  const r3Stories = stories.filter(s => s.slice === 'r3');

  const r1Points = r1Stories.reduce((acc, s) => acc + s.estimatePts, 0);
  const r2Points = r2Stories.reduce((acc, s) => acc + s.estimatePts, 0);
  const r3Points = r3Stories.reduce((acc, s) => acc + s.estimatePts, 0);
  const totalPoints = r1Points + r2Points + r3Points;

  const r1Ratio = stories.length > 0 ? (r1Stories.length / stories.length) * 100 : 0;
  const isR1Overloaded = r1Ratio > 50;

  // Move a story to another slice
  const handleMoveSlice = (storyId: string, targetSlice: 'r1' | 'r2' | 'r3') => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, slice: targetSlice } : s));
  };

  const selectedStory = stories.find(s => s.id === selectedStoryId);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>Category 9: Product & Startup Tools</span>
              <span>·</span>
              <span>Jeff Patton Methodology</span>
              <span>·</span>
              <span>Walking Skeleton & Release Slicing</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              User Story Mapping & Release Slicing Canvas
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Break free from flat backlog blindness. Arrange user stories across the user journey (left to right) and by priority (top to bottom). Slice out a true Walking Skeleton to ship real value in weeks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider block">Total Backlog</span>
              <span className="font-mono font-bold text-slate-900">{stories.length} stories ({totalPoints} pts)</span>
            </div>
            <div className={`p-2.5 rounded-xl border text-xs ${isR1Overloaded ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-emerald-50 border-emerald-300 text-emerald-900'}`}>
              <span className="text-3xs font-bold uppercase tracking-wider block">Release 1 (Skeleton)</span>
              <span className="font-mono font-extrabold">{r1Stories.length} stories ({Math.round(r1Ratio)}% of map)</span>
            </div>
          </div>
        </div>

        {/* Overloaded Release 1 Red Flag Warning */}
        {isR1Overloaded && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Red Flag Warning (Sundaresh Kamaraj Guide):</strong> Release 1 holds more than 50% of the entire story map ({Math.round(r1Ratio)}%). Push non-critical features down into Release 2 or 3 to preserve an authentic walking skeleton!
            </span>
          </div>
        )}
      </div>

      {/* Story Detail & Acceptance Criteria Modal */}
      {selectedStory && (
        <div className="p-5 bg-indigo-50/90 border border-indigo-200 rounded-xl space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-700" />
              <h4 className="text-sm font-bold text-indigo-950">
                User Story Specification: {selectedStory.title}
              </h4>
              <span className="text-3xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-200 text-indigo-900">
                {selectedStory.estimatePts} Story Points · {selectedStory.slice.toUpperCase()}
              </span>
            </div>
            <button
              onClick={() => setSelectedStoryId(null)}
              className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold"
            >
              Close Card
            </button>
          </div>

          <div className="p-3 bg-white rounded-lg border border-indigo-100 text-xs">
            <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block mb-1">User Story Format</span>
            <p className="font-semibold text-slate-900 italic font-serif text-sm">
              "{selectedStory.userStory}"
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-indigo-950 block">
              Given / When / Then Acceptance Criteria (Testable Definition of Done)
            </span>
            <div className="space-y-2">
              {selectedStory.acceptanceCriteria.map((ac, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-lg border border-indigo-100 text-xs font-mono space-y-0.5">
                  <div><span className="text-emerald-700 font-bold">GIVEN:</span> <span className="text-slate-800">{ac.given}</span></div>
                  <div><span className="text-blue-700 font-bold">WHEN:</span> <span className="text-slate-800">{ac.when}</span></div>
                  <div><span className="text-purple-700 font-bold">THEN:</span> <span className="text-slate-800">{ac.then}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* INVEST Checklist */}
          <div className="pt-2 border-t border-indigo-200/60 flex items-center justify-between text-2xs text-indigo-900">
            <div className="flex items-center gap-3">
              <span className="font-bold">INVEST Quality Check:</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold"><CheckCircle2 className="w-3 h-3" /> Independent</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold"><CheckCircle2 className="w-3 h-3" /> Negotiable</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold"><CheckCircle2 className="w-3 h-3" /> Valuable</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold"><CheckCircle2 className="w-3 h-3" /> Estimable</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold"><CheckCircle2 className="w-3 h-3" /> Small (fits sprint)</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold"><CheckCircle2 className="w-3 h-3" /> Testable</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-500 font-sans">Move to:</span>
              <button
                disabled={selectedStory.slice === 'r1'}
                onClick={() => handleMoveSlice(selectedStory.id, 'r1')}
                className={`px-2 py-0.5 rounded text-3xs font-bold ${selectedStory.slice === 'r1' ? 'bg-indigo-900 text-white' : 'bg-white border border-indigo-200 text-indigo-800'}`}
              >
                Release 1
              </button>
              <button
                disabled={selectedStory.slice === 'r2'}
                onClick={() => handleMoveSlice(selectedStory.id, 'r2')}
                className={`px-2 py-0.5 rounded text-3xs font-bold ${selectedStory.slice === 'r2' ? 'bg-indigo-900 text-white' : 'bg-white border border-indigo-200 text-indigo-800'}`}
              >
                Release 2
              </button>
              <button
                disabled={selectedStory.slice === 'r3'}
                onClick={() => handleMoveSlice(selectedStory.id, 'r3')}
                className={`px-2 py-0.5 rounded text-3xs font-bold ${selectedStory.slice === 'r3' ? 'bg-indigo-900 text-white' : 'bg-white border border-indigo-200 text-indigo-800'}`}
              >
                Release 3
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2D Story Map Canvas */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {/* Top Horizontal Backbone Bar (Activities) */}
        <div className="p-3 bg-slate-900 text-white text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Customer Journey Backbone (Left to Right Narrative)</span>
          </div>
          <span className="text-2xs font-mono text-slate-400">7 Core Activities</span>
        </div>

        {/* 7 Columns Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Backbone Header Row */}
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 divide-x divide-slate-200">
              {activities.map(act => (
                <div key={act.id} className="p-3 space-y-1">
                  <span className="text-3xs font-mono font-bold text-indigo-600 block uppercase">
                    Step {act.order}
                  </span>
                  <h5 className="font-bold text-slate-900 text-xs leading-tight">{act.name}</h5>
                  <p className="text-3xs text-slate-500 line-clamp-2">{act.stepDescription}</p>
                </div>
              ))}
            </div>

            {/* RELEASE SLICE 1: WALKING SKELETON */}
            <div className="border-b border-slate-200">
              <div className="bg-emerald-50/80 px-4 py-2 border-b border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Release 1: Walking Skeleton / MVP</span>
                  <span className="text-3xs font-normal text-emerald-700">
                    — Thinnest end-to-end slice allowing a user to discover, book, attend, consult, and pay
                  </span>
                </div>
                <span className="text-2xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  {r1Stories.length} stories ({r1Points} pts)
                </span>
              </div>

              <div className="grid grid-cols-7 divide-x divide-slate-100 p-2 gap-2 bg-emerald-50/20">
                {activities.map(act => {
                  const actStories = r1Stories.filter(s => s.activityId === act.id);
                  return (
                    <div key={act.id} className="space-y-2 min-h-[90px]">
                      {actStories.map(story => renderStoryCard(story))}
                      {actStories.length === 0 && (
                        <div className="p-2 text-center text-3xs text-rose-500 font-bold border border-dashed border-rose-200 rounded bg-white">
                          ⚠️ Missing step!
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RELEASE SLICE 2: COMFORT & USABILITY */}
            <div className="border-b border-slate-200">
              <div className="bg-blue-50/80 px-4 py-2 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Release 2: Comfort & Usability</span>
                  <span className="text-3xs font-normal text-blue-700">
                    — Deepens existing steps (WhatsApp alerts, Tamil filters, digital prescriptions)
                  </span>
                </div>
                <span className="text-2xs font-mono font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                  {r2Stories.length} stories ({r2Points} pts)
                </span>
              </div>

              <div className="grid grid-cols-7 divide-x divide-slate-100 p-2 gap-2 bg-blue-50/20">
                {activities.map(act => {
                  const actStories = r2Stories.filter(s => s.activityId === act.id);
                  return (
                    <div key={act.id} className="space-y-2 min-h-[90px]">
                      {actStories.map(story => renderStoryCard(story))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RELEASE SLICE 3: SCALE & ADVANCED */}
            <div>
              <div className="bg-slate-100/90 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  <span>Release 3: Scale & Complex Integrations</span>
                  <span className="text-3xs font-normal text-slate-500">
                    — Insurance claims TPA, loyalty wallet, TV waiting room display
                  </span>
                </div>
                <span className="text-2xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {r3Stories.length} stories ({r3Points} pts)
                </span>
              </div>

              <div className="grid grid-cols-7 divide-x divide-slate-100 p-2 gap-2 bg-slate-50/40">
                {activities.map(act => {
                  const actStories = r3Stories.filter(s => s.activityId === act.id);
                  return (
                    <div key={act.id} className="space-y-2 min-h-[90px]">
                      {actStories.map(story => renderStoryCard(story))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderStoryCard(story: Story) {
    const isSelected = story.id === selectedStoryId;

    return (
      <div
        key={story.id}
        onClick={() => setSelectedStoryId(story.id)}
        className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all space-y-1.5 ${
          isSelected
            ? 'bg-indigo-900 text-white border-indigo-900 shadow-md ring-2 ring-indigo-400'
            : story.slice === 'r1'
            ? 'bg-white border-emerald-300 text-slate-900 shadow-2xs hover:border-emerald-500'
            : story.slice === 'r2'
            ? 'bg-white border-blue-200 text-slate-900 shadow-2xs hover:border-blue-400'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xs hover:border-slate-400'
        }`}
      >
        <div className="flex items-center justify-between gap-1">
          <span className={`text-3xs font-mono font-semibold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
            {story.estimatePts} pts
          </span>
          <span className={`text-3xs font-extrabold uppercase px-1 rounded ${
            isSelected
              ? 'bg-indigo-800 text-white'
              : story.slice === 'r1'
              ? 'bg-emerald-100 text-emerald-800'
              : story.slice === 'r2'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {story.slice.toUpperCase()}
          </span>
        </div>

        <p className="font-bold text-xs leading-snug line-clamp-2">
          {story.title}
        </p>

        {/* Action button to quickly move slice without opening modal */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100/60 text-3xs">
          <span className={isSelected ? 'text-indigo-200' : 'text-slate-400'}>Move:</span>
          <div className="flex items-center gap-0.5" onClick={e => e.stopPropagation()}>
            <button
              disabled={story.slice === 'r1'}
              onClick={() => handleMoveSlice(story.id, 'r1')}
              className={`px-1 py-0.2 rounded font-bold ${story.slice === 'r1' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              title="Move to Release 1"
            >
              R1
            </button>
            <button
              disabled={story.slice === 'r2'}
              onClick={() => handleMoveSlice(story.id, 'r2')}
              className={`px-1 py-0.2 rounded font-bold ${story.slice === 'r2' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              title="Move to Release 2"
            >
              R2
            </button>
            <button
              disabled={story.slice === 'r3'}
              onClick={() => handleMoveSlice(story.id, 'r3')}
              className={`px-1 py-0.2 rounded font-bold ${story.slice === 'r3' ? 'bg-slate-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
              title="Move to Release 3"
            >
              R3
            </button>
          </div>
        </div>
      </div>
    );
  }
}
