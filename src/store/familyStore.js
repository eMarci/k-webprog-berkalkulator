import {create} from "zustand";
import {DateTime} from "luxon";

const SZJA = 0.15;
const TB = 0.185;
const SZJAReliefThreshold = 499_952;
const PersonalRelief = 77_300;
const NewlywedRelief = 5_000;
const Family1RelievedRelief = 10_000;
const Family2RelievedRelief = 20_000;
const Family3MRelievedRelief = 33_000;

const computeSalary = (member) => {
    let tax = 0;

    tax += member.salary * TB;

    if (member.reliefs.pit.active) {
        if (member.salary > SZJAReliefThreshold) {
            tax += (member.salary - SZJAReliefThreshold) * SZJA;
        }
    } else {
        tax += member.salary * SZJA;
    }

    if (member.reliefs.newlywed.active && member.reliefs.newlywed.attrs.eligible) {
        tax -= NewlywedRelief;
    }

    if (member.reliefs.family.active) {
        if (member.reliefs.family.attrs.supports > 0
            && member.reliefs.family.attrs.relieved > 0) {
            const s = member.reliefs.family.attrs.supports;
            const r = member.reliefs.family.attrs.relieved;
            if (r === 1) {
                tax -= Family1RelievedRelief * s;
            } else if (r === 2) {
                tax -= Family2RelievedRelief * s;
            } else {
                tax -= Family3MRelievedRelief * s;
            }
        }
    }

    if (member.reliefs.personal.active) {
        tax = Math.max(0, tax - PersonalRelief);
    }

    return Math.round(member.salary - tax)
};

const isEligible = (member) => {
    const selected = DateTime.fromMillis(member.reliefs.newlywed.attrs.date);
    const today = DateTime.local();

    const { years, months } = today.diff(selected).shiftTo("years", "months");

    return years <= 2 && months >= 1;
};

const useStore = create((set) => ({
    selected: -1,

    familyMembers: [],

    setSelected: (ind) => set(() => ({ selected: ind })),

    newMember: () => set(state => ({
        selected: state.familyMembers.length,
        familyMembers: [...state.familyMembers, {
            name: "Új családtag",
            salary: 0,
            computedSalary: 0,
            reliefs: {
                pit:        { active: false, attrs: {} },
                newlywed:   { active: false, attrs: { date: null, eligible: false } },
                personal:   { active: false, attrs: {} },
                family:     { active: false, attrs: { supports: 0, relieved: 0 } }
            }
        }]
    })),

    updateNewlywedEligibility: () => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member,
            reliefs: {
                ...member.reliefs,
                newlywed: {
                    ...member.reliefs.newlywed,
                    attrs: {
                        ...member.reliefs.newlywed.attrs,
                        eligible: isEligible(member)
                    }
                }
            }
        } : member)
    })),

    updateComputedSalary: () => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member, computedSalary: computeSalary(member)
        } : member)
    })),

    deleteMember: () => set(state => ({
        familyMembers: state.familyMembers.filter((member, index) => index !== state.selected)
    })),

    setName: (name) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member, name: name
        } : member)
    })),

    setSalary: (salary) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member, salary: Math.round(salary)
        } : member)
    })),

    setPIT: (value) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member,
            reliefs: {
                ...member.reliefs,
                pit: {
                    ...member.reliefs.pit,
                    active: value
                }
            }
        } : member)
    })),

    setNewlywed: (value) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member,
            reliefs: {
                ...member.reliefs,
                newlywed: {
                    ...member.reliefs.newlywed,
                    active: value
                }
            }
        } : member)
    })),

    setNewlywedDate: (date) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member,
            reliefs: {
                ...member.reliefs,
                newlywed: {
                    ...member.reliefs.newlywed,
                    attrs: {
                        ...member.reliefs.newlywed.attrs,
                        date: date,
                    }
                }
            }
        } : member)
    })),

    setPersonal: (value) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member,
            reliefs: {
                ...member.reliefs,
                personal: {
                    ...member.reliefs.personal,
                    active: value
                }
            }
        } : member)
    })),

    setFamily: (value) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member,
            reliefs: {
                ...member.reliefs,
                family: {
                    ...member.reliefs.family,
                    active: value
                }
            }
        } : member)
    })),

    changeFamilySupports: (offset) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member,
            reliefs: {
                ...member.reliefs,
                family: {
                    ...member.reliefs.family,
                    attrs: {
                        ...member.reliefs.family.attrs,
                        supports: member.reliefs.family.attrs.supports+offset
                    }
                }
            }
        } : member)
    })),

    changeFamilyRelieved: (offset) => set(state => ({
        familyMembers: state.familyMembers.map((member, index) => index === state.selected ? {
            ...member,
            reliefs: {
                ...member.reliefs,
                family: {
                    ...member.reliefs.family,
                    attrs: {
                        ...member.reliefs.family.attrs,
                        relieved: member.reliefs.family.attrs.relieved+offset
                    }
                }
            }
        } : member)
    }))
}));

export default useStore;