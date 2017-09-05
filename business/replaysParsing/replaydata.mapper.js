let unit = module.exports = {
    "translateMapData": (mapPath) => {
        let fileName = mapPath.substr(mapPath.lastIndexOf('\\') + 1).toLowerCase();

        switch (fileName) {
            case '2p_abandon_all_hope': return { name: 'Abandon all hope', url: 'http://i.imgur.com/Q54Oi9L.jpg' };
            case '2p_absolute_zero': return { name: 'Absolute zero', url: 'http://i.imgur.com/b7yNS4t.jpg' };
            case '2p_battle_marshes': return { name: 'Battle marshes', url: 'http://i.imgur.com/VjbQkAc.jpg' };
            case '2p_blood_river': return { name: 'Blood river', url: 'http://i.imgur.com/w9mLoM1.jpg' };
            case '2p_bloody hell': return { name: 'Bloody hell', url: 'http://i.imgur.com/Mnevd6N.jpg' };
            case '2p_deadmans_crossing': return { name: 'Deadmans crossing', url: 'http://i.imgur.com/IDmr7Qk.jpg' };
            case '2p_edemus_gamble': return { name: 'Edemus gamble', url: 'http://i.imgur.com/skZWEz6.jpg' };
            case '2p_eden': return { name: 'Eden', url: 'http://i.imgur.com/KgIBwtI.jpg' };
            case '2p_emerald_river': return { name: 'Emerald river', url: 'http://i.imgur.com/7QmJ5eR.jpg' };
            case '2p_emperors_valley': return { name: 'Emperors valley', url: 'http://i.imgur.com/E0F6sfW.jpg' };
            case '2p_faceoff': return { name: 'Faceoff', url: 'http://i.imgur.com/9VOvDBU.jpg' };
            case '2p_fallen_city': return { name: 'Fallen city', url: 'http://i.imgur.com/sl52R9k.jpg' };
            case '2p_fata_morgana': return { name: 'Fata morgana', url: 'http://i.imgur.com/7OVdvHc.jpg' };
            case '2p_fear': return { name: 'Fear', url: 'http://i.imgur.com/S0a5cqv.jpg' };
            case '2p_frostbite_river': return { name: 'Frostbite river', url: 'http://i.imgur.com/MVpl1X8.jpg' };
            case '2p_haines_demise': return { name: 'Haines demise', url: 'http://i.imgur.com/Igq1dTA.jpg' };
            case '2p_hellfire_canyon': return { name: 'Hellfire canyon', url: 'http://i.imgur.com/kvV8JlO.jpg' };
            case '2p_meeting_of_minds': return { name: 'Meeting of minds', url: 'http://i.imgur.com/GnW77zv.jpg' };
            case '2P_meltdown': return { name: 'Meltdown', url: 'http://i.imgur.com/BhApQpQ.jpg' };
            case '2p_outer_reaches': return { name: 'Outer reaches', url: 'http://i.imgur.com/GtzLVgI.jpg' };
            case '2p_outpost': return { name: 'Outpost', url: 'http://i.imgur.com/Tq35UwQ.jpg' };
            case '2p_railway': return { name: 'Railway', url: 'http://i.imgur.com/PDSEzCV.jpg' };
            case '2p_river_bed': return { name: 'River bed', url: 'http://i.imgur.com/m2ZeVW4.jpg' };
            case '2p_shrine_of_excellion': return { name: 'Shrine of excellion', url: 'http://i.imgur.com/md5TKwk.jpg' };
            case '2p_Subterranean_Struggle': return { name: 'Subterranean struggle', url: 'http://i.imgur.com/D7mxaHH.jpg' };
            case '2p_tainted_pair': return { name: 'Tainted pair', url: 'http://i.imgur.com/azlXVG2.jpg' };
            case '2p_tazins_folly': return { name: 'Tazins folly', url: 'http://i.imgur.com/ZgklAmj.jpg' };
            case '2p_titan_fall': return { name: 'Titan fall', url: 'http://i.imgur.com/vxxo5sR.jpg' };
            case '2p_tranquilitys_end_pro': return { name: 'Tranquilitys end pro', url: 'http://i.imgur.com/wI0ByhV.jpg' };
            case '2p_valley_of_khorne': return { name: 'Valley of khorne', url: 'http://i.imgur.com/ygZ3QY8.jpg' };
            case '4p_ariel_highlands': return { name: 'Ariel highlands', url: 'http://i.imgur.com/CqbUnqH.jpg' };
            case '4p_biffys_peril': return { name: 'Biffys peril', url: 'http://i.imgur.com/9vhtDnk.jpg' };
            case '4p_doom_spiral': return { name: 'Doom spiral', url: 'http://i.imgur.com/dP7yVx0.jpg' };
            case '4p_dread_peak': return { name: 'Dread peak', url: 'http://i.imgur.com/SasHt6k.jpg' };
            case '4p_eres_badlands': return { name: 'Eres badlands', url: 'http://i.imgur.com/iIZ0vNG.jpg' };
            case '4p_gorhael_crater': return { name: 'Gorhael crater', url: 'http://i.imgur.com/VTOyCYS.jpg' };
            case '4p_ice_flow': return { name: 'Ice flow', url: 'http://i.imgur.com/NS0ULOH.jpg' };
            case '4p_into_the_breach': return { name: 'Into the breach', url: 'http://i.imgur.com/eSDsYYM.jpg' };
            case '4p_janus_savannah': return { name: 'Janus savannah', url: 'http://i.imgur.com/l1VUnwv.jpg' };
            case '4p_mountain_trail': return { name: 'Mountain trail', url: 'http://i.imgur.com/STlIkRM.jpg' };
            case '4p_murad_swamplands': return { name: 'Murad swamplands', url: 'http://i.imgur.com/7PYEW4a.jpg' };
            case '4p_panrea_lowlands': return { name: 'Panrea lowlands', url: 'http://i.imgur.com/V3IDzN0.jpg' };
            case '4p_quatra': return { name: 'Quatra', url: 'http://i.imgur.com/ASrd37R.jpg' };
            case '4p_saints_square': return { name: 'Saints square', url: 'http://i.imgur.com/LNsmuYH.jpg' };
            case '4p_tainted_soul': return { name: 'Tainted soul', url: 'http://i.imgur.com/MtTGJF8.jpg' };
            case '4p_tartarus_center': return { name: 'Tartarus center', url: 'http://i.imgur.com/Ns93kjD.jpg' };
            //case '2p_tiboraxx':return { name: 'Tiboraxx', url: 'http://i.imgur.com/yAMYKVQ.jpg' };
            case '4p_tiboraxx': return { name: 'Tiboraxx', url: 'http://i.imgur.com/yAMYKVQ.jpg' };
            case '4p_torrents': return { name: 'Torrents', url: 'http://i.imgur.com/Ae9vCjF.jpg' };
            case '4p_van_de_mar_mountains': return { name: 'Van de mar mountains', url: 'http://i.imgur.com/UHlj01k.jpg' };
            case '4p_volcanic reaction': return { name: 'Volcanic reaction', url: 'http://i.imgur.com/rB4jnWm.jpg' };
            case '6p_agamar_desert': return { name: 'Agamar desert', url: 'http://i.imgur.com/Eavt2cJ.jpg' };
            case '6p_alvarus': return { name: 'Alvarus', url: 'http://i.imgur.com/uiXdPHV.jpg' };
            case '6p_bloodshed_alley': return { name: 'Bloodshed alley', url: 'http://i.imgur.com/9jl1S1o.jpg' };
            case '6p_crossroads': return { name: 'Crossroads', url: 'http://i.imgur.com/zuWAHcC.jpg' };
            case '6p_crozius_arcanum': return { name: 'Crozius arcanum', url: 'http://i.imgur.com/zGPT2yD.jpg' };
            case '6p_dread_alley': return { name: 'Dread alley', url: 'http://i.imgur.com/7PSDOG1.jpg' };
            case '6p_fury_island': return { name: 'Fury island', url: 'http://i.imgur.com/bTyRzdY.jpg' };
            case '6p_hyperion_peaks': return { name: 'Hyperion peaks', url: 'http://i.imgur.com/AlIdr0Q.jpg' };
            case '6p_jungle_walls': return { name: 'Jungle walls', url: 'http://i.imgur.com/Vhr1oci.jpg' };
            case '6p_kasyr_lutien': return { name: 'Kasyr lutien', url: 'http://i.imgur.com/SadrDe4.jpg' };
            case '6p_mortalis': return { name: 'Mortalis', url: 'http://i.imgur.com/THKW2yA.jpg' };
            case '6p_orestan_plains': return { name: 'Orestan plains', url: 'http://i.imgur.com/p5I2G45.jpg' };
            case '6p_pavonian_heartland': return { name: 'Pavonian heartland', url: 'http://i.imgur.com/j8LtM56.jpg' };
            case '6p_pavonis': return { name: 'Pavonis', url: 'http://i.imgur.com/U4UNIv7.jpg' };
            case '6p_paynes_retribution': return { name: 'Paynes retribution', url: 'http://i.imgur.com/AZIgo5O.jpg' };
            case '6p_rhean_floodlands': return { name: 'Rhean floodlands', url: 'http://i.imgur.com/7UQoLwB.jpg' };
            case '6p_testing_grounds': return { name: 'Testing grounds', url: 'http://i.imgur.com/OyUdChT.jpg' };
            case '6p_thargorum': return { name: 'Thargorum', url: 'http://i.imgur.com/4miCKRS.jpg' };
            case '6p_vandea_coast': return { name: 'Vandea coast', url: 'http://i.imgur.com/Jm0P48u.jpg' };
            case '6p_western_barrens': return { name: 'Western barrens', url: 'http://i.imgur.com/kE0unqr.jpg' };
            case '6pteam_streets_of_vogen': return { name: 'Streets of vogen', url: 'http://i.imgur.com/xCokQBQ.jpg' };
            case '8p_burial_grounds': return { name: 'Burial grounds', url: 'http://i.imgur.com/oskjGwd.jpg' };
            case '8p_daturias_pits': return { name: 'Daturias pits', url: 'http://i.imgur.com/Q0hLmCf.jpg' };
            case '8p_demes_northlands': return { name: 'Demes northlands', url: 'http://i.imgur.com/5wYfPhW.jpg' };
            case '8p_doom_chamber': return { name: 'Doom chamber', url: 'http://i.imgur.com/v7ZLdod.jpg' };
            case '8p_forbidden_jungle': return { name: 'Forbidden jungle', url: 'http://i.imgur.com/B9pLyOQ.jpg' };
            case '8p_lost_hope': return { name: 'Lost hope', url: 'http://i.imgur.com/nFcZ9vs.jpg' };
            case '8p_morriah_coast': return { name: 'Morriah coast', url: 'http://i.imgur.com/RyklFlb.jpg' };
            case '8p_oasis_of_sharr': return { name: 'Oasis of sharr', url: 'http://i.imgur.com/sxEy6ma.jpg' };
            case '8p_penal_colony': return { name: 'Penal colony', url: 'http://i.imgur.com/O5etsV7.jpg' };
            case '8p_rhean_jungle': return { name: 'Rhean jungle', url: 'http://i.imgur.com/wxg5bwe.jpg' };
            case '8p_thurabis_plateau': return { name: 'Thurabis plateau', url: 'http://i.imgur.com/vtw5L6R.jpg' };
            case 'antiga bay (2) v10': return { name: 'Antiga bay (2) v10', url: 'http://i.imgur.com/KSKD9HH.jpg' };
            case 'diceyambush': return { name: 'Dicey ambush', url: 'http://i.imgur.com/I9y3JcM.jpg' };
            case 'galenas crusade (2) v10': return { name: 'Galenas crusade (2) v10', url: 'http://i.imgur.com/EFLScl4.jpg' };
            case 'jungle morning(2)v2-6': return { name: 'Jungle morning (2) v2-6', url: 'http://i.imgur.com/fau9fkK.jpg' };
            case 'pro_2p_quests_triumph': return { name: 'Quests triumph pro', url: 'http://i.imgur.com/KaLHsN1.jpg' };
            case 'sands of time (2) v10': return { name: 'Sands of time (2) v10', url: 'http://i.imgur.com/oPrnD2c.jpg' };
            case 'short below zero (2) v14': return { name: 'Short below zero (2) v14', url: 'http://i.imgur.com/IeOZHWW.jpg' };
            case '2p_belltower': return { name: 'Belltower', url: 'http://i.imgur.com/98jT54t.jpg' };
            case '2p_blood_river_remix': return { name: 'Blood river remix (Hype version)', url: 'http://i.imgur.com/1X4EQpL.jpg' };
            case '2p_light_brigade': return { name: 'Light brigade', url: 'http://i.imgur.com/yBEvs7R.jpg' };
            case '2p_fraziersdemise': return { name: 'Fraziers demise', url: 'http://i.imgur.com/BhgChRF.jpg' };
            case '2p_meeting_of_minds_pro_lis_v1': return { name: 'Meeting of minds pro', url: 'http://i.imgur.com/HKUE0ao.jpg' };
            case '2p_outer_reaches_remix': return { name: 'Outer reaches remix (Hype version)', url: 'http://i.imgur.com/TLLlV7l.jpg' };
            case '2p_refinery': return { name: 'Refinery', url: 'http://i.imgur.com/sFlILVy.jpg' };
            default: return { name: '', url: '' };
        }
    },
    "mapRace": (raceIdentifier) => {
        switch (raceIdentifier) {
            case 'chaos_marine_race': return 'Chaos';
            case 'eldar_race': return 'Eldar';
            case 'ork_race': return 'Orks';
            case 'space_marine_race': return 'Space marines';

            case 'guard_race': return 'Imperial guard';

            case 'necron_race': return 'Necrons';
            case 'tau_race': return 'Tau';

            case 'sisters_race': return 'Sisters of battle';
            case 'dark_eldar_race': return 'Dark Eldar';
        }
    }
}