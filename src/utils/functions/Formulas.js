//cosas a considerar el numero de salida depende de los numeros de digitos a mostrar, por lo que se siguio en base a lo mostrado en excel
//tambien que las entradas estan fixeadas pero al ser una funcion aparte no se incluye esta deberia ser usada al introducir los campos a la base de datos

//CE
//Convierte CE us/cm a dsm^-1
function CE_Cm_Dsm(Ce_uscm)

{  dsm=((Ce_uscm*0.000001)/0.1)*100;
    
return dsm.toFixed(3);
}
//H-AL
//Convierte ml NaOH(acidez) a cmol
function mlNaOH_cmol(mlNaOH,N_NaOH)

{  NaOHCmol=((mlNaOH-0.025)/5*((N_NaOH*100)));
    
return NaOHCmol.toFixed(2);
}
//Convierte ml HCl(aluminio) a cmol
function mlHCl_cmol(mlHCl,N_HCl)

{  HClCmol=(((mlHCl-0.025)*(N_HCl)*(100))/5);

return HClCmol.toFixed(2);
}
//MO
//Convierte mL_FeSO4 a Mo
function mL_FeSO4_Mo(mlFeSO4)

{ FeSO4_Mo=(1-mlFeSO4/20.2)*13.4;

return FeSO4_Mo.toFixed(2);
}

//Micros
//funcion global para todas las micros
//convierte el elemento ppm a mg kg^-1 , p_elemento es el promedio
function elemento_ppm_mgkg(elemento_ppm,p_Elemento)

{   elemento_mgkg=(elemento_ppm-p_Elemento);

return elemento_mgkg.toFixed(3);
}


//Bases Intercambiables
//convierte el Ca ppm a Ca cmol kg
function Ca_ppm_cmol_kg(Ca_ppm,p_Ca)

{    Ca_cmol_kg=(Ca_ppm-p_Ca)/200.4;

return Ca_cmol_kg.toFixed(4);
}

//convierte el K ppm a K cmol kg
function K_ppm_cmol_kg(K_ppm,p_K)

{    K_cmol_kg=(K_ppm-p_K)/391;

return K_cmol_kg.toFixed(2);
}

//convierte el Mg ppm a Mg cmol kg
function Mg_ppm_cmol_kg(Mg_ppm,p_Mg)

{   Mg_cmol_kg=(Mg_ppm-p_Mg)/121.6;

return Mg_cmol_kg.toFixed(2);
}

//convierte el Na ppm a Na cmol kg
function Na_ppm_cmol_kg(Na_ppm,p_Na)

{    Na_cmol_kg=(Na_ppm-p_Na)/230;

return Na_cmol_kg.toFixed(2);
}

/*

N_NaOH=0.0984;
N_HCl=0.0955;
console.log(CE_Cm_Dsm(152.40));
console.log(mlNaOH_cmol(0.30,N_NaOH));
console.log(mlHCl_cmol(0.10,N_HCl));
console.log(mL_FeSO4_Mo(13.60));
console.log(elemento_ppm_mgkg(1.770,0.068));

console.log(Ca_ppm_cmol_kg(2515.005,1.439));
console.log(K_ppm_cmol_kg(343.719,0.337));
console.log(Mg_ppm_cmol_kg(589.781,0.346));
console.log(Na_ppm_cmol_kg(688.997,46.67)); //en este se utilizo el error para mostrar los datos de la tabla,aunque no deberia ser este promedio

*/