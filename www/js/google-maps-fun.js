// Erabiltzailearen uneko posizioa eta ikusi nahi duen lekua kokatu mapan.
// lng eta lat: Lekuaren longitude eta latitudea
// nola: WALKING (oinez), DRIVING (kotxez), TRANSIT (zerbitzu publikoan)
function prestatuLekuaMapa(id, lng, lat, nola) {	
	// Erabiltzailearen uneko latitude eta longitude balioekin Google Maps-eko LatLng objektu bat sortu
	var latLng	= new google.maps.LatLng(unekoLatitudea, unekoLongitudea);
			
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();

	directionsDisplay = new google.maps.DirectionsRenderer();
	
	// Euskal herriaren mugak
	var eh_points = "kd}dGfumCiEnr@{\\nr@cB~\\lHtcAfEvXr@pnBxQ|i@zQiC~Tvg@~IqGz\\j_A~T`{@deBqGhf@hClSsGlShRvYcAlH`{@dn@trAdy@cAp@vXhPzKcBxv@|}@tItNdAdc@aNxd@vI|g@mT`k@sGvYdPdM`]dXeAn^ip@|g@sVzQhRxd@pGl|@`l@wCdPdXvI`JiCpKlc@dMre@aUfn@{FnaA|Q`l@jq@?xYwIn^cAiEduCfXrGn^j_Adv@zZ`Uvg@|\\dAnSzK|QfCaJja@rKrt@xYd_@jPhCs@naAnHhp@rKj_AbB|x@{Ftt@?zi@zFre@|Q?hPrV|F|i@tl@?p|@ka@lf@zKfc@nTnoAePbU~MlH|i@xY|i@uC|gAbBha@hEhR_]flAq@vg@iE|x@rKztA{Fd}@p@|ZkPbwBhEfn@`fAfCtVgCnoAzK|o@bAm[trA?|i@l[~MhXcAjPyv@hc@oaA|Q~MiEvg@rKvX|Q`]`]f}@|QzKdBlTb`@bP?nc@fk@lTxrAcAp^wXvVhRoHlT`JlnAbh@`l@?lT_RlT|FrGeUpV}QtcAgMre@yNpG?fn@bh@lc@jc@rGdwBxcBd`@cApf@d_@tVoc@b{@hCq@wg@xNka@py@mEd`@_NnaA`]hXhRpSlE~Qlc@`]`]tKvv@lc@l}Axa@nc@dh@d_@liAbyAjqAbAzgAvg@pn@zKhfAxg@hEbP`e@wXlP{ZsSkp@|Fwg@|YiRp[wIzN{K`J`NxViRjXlTlPlTnHvIlPdP|YflAhrDnhDtf@hR|YvX`RvX|a@|x@|YsVr[_NrSePlPcPd]lThMlTxV{K~t@xg@js@{Kt_C`jAfUzZv^zKpc@vIzVwIv^mEtSmTzN{ZtSsVd]st@~a@_N~YsG`ZlEtSzKd]qGtSzKhp@lThMiRs@uIbRbAfUcAx^bPjh@dAxf@pVf]{KhMmc@jEiRlcAm}AzNe_@vKiRhx@mE`b@cA~a@e_@b}@}i@nPcAvKoT~Fe_@kMor@wCwv@?oT|FqVkEoc@xCiRvn@vIpP{KpHwIf]{KzViRt[`]nXePzf@|x@t[nr@fe@nc@ps@naA`b@hRh`BppAnsAnaAtk@dPlx@d_@nXfCbb@paAbRa]pPmEjUbAbZhCpH`l@n`@taBjMuIbZtXvc@zKbZhRdRd_@|NvIxCjp@yKrt@wKrVdBzi@eBd_@eB|i@q`@|x@cRjp@~F`jAdBl}Azn@dP~FpVpH|i@jU`l@yCrt@?lTwKxg@kEvv@kMlnA_Gre@qHre@qP~\\sHpUW~MsLvXiMjSeFvXeZdP{f@`]kUdQi]dPcNbOkM~\\qHf`@VdP}FdPmAbPcJb^eFvXeBbOeJ~MkExJ_KrHqDhReB`NdFjSpH|LjMcAp@vJkA~L}JnFyCpGeFxJYrH}N`]?tH~FdBpDdBxGeBjGdB|D`G_AfBKxCjEa@xAfCpDr@~BxCvElEdDa@r@wBjCdAdBlE~DdIe@vBpDfCdBjDlCPY|E_C|D_CwBeBbAeBlEyAlEKjD_AvIdBzD_CrH~B`NpH`O}VtWr@zZXpd@eNrV?xJqHvXkMvv@kItHeBpGwKzKyGhRoX|LwOjS}Rd_@}V`Nsk@zi@wSnT}NzKjAfQqDnUbNd_@vSjp@eBvJ|FfQiQ|i@wSha@kI|ZwCtIvClb@jInUeFvXdFzKr@|i@_GdPwOzKkI`OoT|LqDfQeN~MxCnF~BjDvGeBnTtf@_z@tf@aVxYhMbOXlTeJnF}JnFcR|ZiQtIeBzK_GjDcNgCkE|[jEzw@}N~MqHfQwOnFcRqGwC~McmAqG{VlE{^jb@wKiRyn@`@}JoFkEaOaR?yC{KkIdBcJqG{RmTu[kSqD_MufAglAq@_N}NaOwKcOuSuWeB{KuO{Kyb@gQwGqVqLePix@knAaNeP{VkDkErGkEgB{ZeBs[uHgY}[{Roc@cFyYtn@cvB`^iRnH}x@vOcm@_G_NmTa@iQ{w@kh@_k@|FchBdJm`Aj`@st@tz@or@u[o`AyV}j@oPc^iUse@iIoc@qLe_@mXzh@uK|j@wj@nTs[bPm`@?{m@kb@kh@g{AyVjSeFhR~FbPmA|ZXbPkAfQbNxJyCjSmTfBiQa@eYhRcJqFaVdAuKlT?fQ_GzZiExJ?rVkIbPvKtHcJjSwCxJkEvXpDbPtOzKy}@fuCr[rHnPzKp@nT{JbPuWzKai@re@jApUtO~MbFjb@Yre@aNhRoL~L?dQkAvXeBvXuKdPaVtHuOqFyVsHk`@a@iMfCqDxJr@`N|]|[{J~MaRvXcJnc@{NpGiMvXmTzKwCzKVrG|FlExCfCpDeBpDfCbFiDjEfC|FeBbJtIeBnr@?nc@}JzZiMdPaNtHuKyJgY}ZwZoUca@{KyVxJsWsG}a@fQkAvIvG~j@iItf@wKlq@gM|LwGvX_V`{@eYdn@mPse@{N}LgQ?aNbOiI~\\jA`NqDtIgUvIiEwI{NuI}]eA{JrVp@re@hEjDjEcAvGfCtGeBnLhRoHbP{NvIw^jSyRbO{JjDeB`Op@rVqD|j@~BfQnHjS?tWiIbOyRpGmTyYuGdBkX~[gQwIsO`N_C~M`NxJzJbPiEdP{JhC}JmEmPtW}Ff`@sKlTiIhC}JzZvGfQtKnU?`NuK|LsSrHmPvIq@dPvCzi@lPbOtKjSjAxY`JhRxC`]nDnUjAzKvGjDbFeBvGtIh\\lb@`Ntu@fQ~[lPrWiI|i@qDf`@aJ`l@aR`@wm@dAc]g`@{NqUyVyJqSb^}FlT{NvXqSsH}F?aR}La]nr@YzKaa@bkAgMeBaRre@aJdB_VkS}F{KeQgC{NoTg`@_NoHlTaNnTbFhRoDzi@_CtWnHxJiEfQqDtIwCrVbFzK?zKjX~j@Y|L{JfBY~MnHtW|YjDfQ|LnHha@Xtf@jAb^aNhRyRlE_V|LoHfQr@nc@cF|[|BhRxRhRhEbm@cFpd@wVkSp@qG_NdB{NpUuGtf@jAhp@}Fre@kTlb@a]kSiIiCwCmE_V~MwCtW{YvdAiI|[uKb^?vIvVdPnH~MkAjS{F`O{NrGg\\`@{NvIuGvXeQ`OqSlEqWlEeB`]cBbPpSxJlLuI~QcObFpGnHfQuGvXgMtWcFrVbBtWiE|[wR~[aNnUiEjSfMtWnHlTtVcPrS_M`]jDvC|i@bFpd@oH`OgMeBqSpG_RzKmLkDcJtHwChRiE|L~QxJlL~MdBfQqDvX_NjS{Na@_NzKwCrVjAdn@qDd_@sKd_@VlTbFxJiz@fo@sStWe`@dP`JrVwC|[q@h|A}UnTsOvg@}Flb@~QnpApDnT|BrHdd@`]qDzZcBvg@_Cfn@oDnd@s@nc@cBf`@uG~[_VxJqSeA}UqVWwIgMqUyNeBwVyJq@wIyRdAyNtImL~[`J|L|YpGva@rVfQrV`Yre@jTre@rKxJrb@iClLyYhEcOzJkD~BnT_CvsAr@bPYd_@kPh`@mP|LkPfQiIjSjAtWzYnU`]jDvG|L_Cj_AbFzKzJpGxRaOfM}LpO~MjAtWaFxYgQdP_RvJoWeBwVcOsOcPXiRoHqGuG?yNbPwVf`@_NjScJdAwCrHn[fQvRzKjAzh@dBtIeBtf@cBrVvVzKtGiCpf@|x@bBfQjEdPcFfQaNtIcUhCyRnFyNzKm_@jDkPzK}FlToDzKiX|ZnDzi@q@tWmLjDuZcAoWmE{]wIgIzKrKtWbYxYvCd_@nDrV`J|[X|i@ytBcjA{h@}LojBc^s`AjDwnAwIuVgCwt@mSr@lSiIhRdBdQeBrG_NnaAyN~j@{d@l`Awa@ha@yJfQ_RpGaFd_@sKtHoHjScFps@hEbO`JrHzJjS}FvXwNhRri@nTzbArt@fz@mTfXtI`YfQvGbOlWuHdQbOpDrt@`Y~y@vp@vIzJfQwR`OVhRuG~MoDdP|BpGva@bOzJoFrZc@lLdPdBxYcFxJuVbAm[`NcFbPeQfQ_NtWeQ`@sZjDcU|LuG{KsOst@_Nqd@kP{Zm[wIiTiCqOpUwCjSkPgQsZsHuVmE{JnFjPzw@|Qre@jAre@eMbAuVdPgIhRyNmEkPwIoS}LyNkDyNjDgXxh@{Uzh@{FjSYrVjA|[uG~[eM~MgIlTmLja@mLd_@}Q~McQha@gXa@{UvIkPdBkPrGcBgQcFmEgItIwNtHgI_NyN?}QoTuCbOaJpVoDlS_Nc@}k@oU}Bnc@oH~\\yJxg@yJjSgI~MvCvXtCtWqOkD}M}LqOjDkPrWhEnTdBzZiEpd@VxJq@bP}BlShEzi@Vja@{Ftf@tV~MlWtWaU|[kPhRin@rGgTzKuGvXoDd_@kAtf@kLjS{UrHcFsWiPmE{FnFnDvg@sKhR}\\mE_J|LpZl}A}B~MsK~j@qZlEk[`]eg@zKsVuH_J{KgTbAaJ`NxJvg@fTlq@aFd_@sKhRaFlTqOdP?~Mb`@dAt]lTgIhRcQtIgTlEiEd_@sGre@nOrV?jSpOrVpOzZhAfn@bFnd@oD|ZlHtf@jA`l@ij@io@}FmT_o@sViPcAc`@gQsVuI}MmSsKoFgEoF|Brt@}\\bm@eMhR}Mb^wN|ZcBbP}BtHwNjS}r@i~@aUmE_JzK_YeP}M?gIqGqKiCwNoUg_@bA?iRiE{K?sWcXyJwYjDeXoTtCe_@uh@yJwJa^aUcOcX?wd@ia@}r@gQiLdn@}XmEgTdP{Qjb@hEd_@t_BnoAh[?tNha@hf@xYbQnT|BrW|MrVkAtWp@xv@sl@jq@uNlScQzi@zwA`{@|BvIbQnc@fj@`O|c@hmAfdAgjBhEdkA}Mnd@u]pd@_JrV{Fa@iEfQy`@vg@ubAlq@cMd_@cQrW_{AtoBcMnUus@lb@}MoaAezAhD_aAitDoOfBkLuHqVhCeIqGa}@kp@cBmTueAdBeB}LmZkp@?_]rGyYvJxC~@kD_AwB~@wBkAkD~GaGvAsHiC_FoMmE?eIe@wIvJwQ~@_FiCeB_A{DuCs@XaGqB_FbB_Gp@cH|DuH?{KtCmE}@wQb@ae@l^}nAp@mS~Ig`@bD{Zp@sVxHia@l^`GbMvBjWxJpa@tIzFiKp@ePtEmE`DmEhEwQq@yQVki@cBeBvLa@~TcH~KmL`FgCxF_MyHkx@W{p@qXqU`HgJ`D{DxJyQzDeBvY{R|B|Dp@qF_AwBiAqbAp@oFYce@uCuPwCoFmHuHWoFfE}L~@uWtCgQuC}T_Ju|@e@gXiEuWaFg~@uC_F|@{D?aGyHse@yHyCkAkKeT~Eo\\eW{DiKql@oc@aFcPvJc^ss@ef@W_]wC{K{ZsVe@nFoD`GmFuAkAbAgGbHoB?YjD}B|LiNjSgEtAcBhCuEtAkJfJwCjKWhKs@nFq@zKXjKtEdQq@zKe@~E|@rHiCnMYfQ{B~EkArH_JpGsIhCwA{DsEwB_JhDwC|Sr@fBe@rH}Ba@mH~M_HlE_AhJuCxCp@zDKdIcDvBuExQoDfCwAhRsGzCcBzDmHfB{BnFwL}ZcDsAmFqFeKa@oOuIiArA_AvP{DrOgPxJ_AhD{BcAiPpNsG|LK`GeKhCyFdIcD|LgE`GY`H_HjK_HdBoDyCqKhCcB}DaHn\\d@bHiCvP{DbP{DvIiCxCmH`NlQzDtE`G|Tj_AcVjdB?pxA_JtPbBpwAnFxo@wArHwCxQgYzp@eItP?dPeBnFmFvIoBhKgPlTiCbHyJzKkH|LcDwBaFP?{KkJuPkJ|LuCQuC_Ub@gYbDa]e@yJ?aOpByQJ{SuCaVb@cViUcAiNp]kHq@uPkK}@uIcDxC_SuAmOtAyHQiCxCoBq@cD`@oBwB?}SeIPeIhDgGpFyHs@uE}DyZyRmFbA{VjK}MNd@tHkAdItEfQaFbHoBzSwLzKe@|LmDtA}B|D{DdBwJsHgGcOwJiKwJyQ}IuIoDjD{MsGiE{KaMiReIqGmZ{ZqKuHeP`NqK`@gt@~\\zMja@h^pVsGbO_QxY{MvX?xh@gEbOwJjS_JbO}IjSuC`O{FrGwJ?aq@c{@uaBopA{B|LuNvXwn@oc@wJaOiAwIcB{KiL}L?uHsGuIyF}ZrGmE?sHiEePmVhC}TxJyXvXeIpGyFhRaF`@cBzKqGlT|Ih`@sGd_@xF|Lq@lTvJzKnDpUh^~\\lDrG{BhRYzZcB~MaFzZmO|ZgLnF_JrHuCvIjSjStJ|LkOrGfEhRhLjSp@xJaXvXjAxJcMhDq@`NoKjDgEtIkH?sGtHaFgB_Xxg@mHpG}P~MmObOaF~M{BlEtU`O{Flb@nDlEtCzZjAxYuCfQYxYjZqG|IbO?nUhLhRhLvXhLpd@`M|LjH~MhLf`@nVbOfErHbBzKbB~j@dItHxXnpAcMtWnD|L|ItHjShRrYvIlVnUbBbOzF|[cBb^fE`OtCtWtUlb@z_@trAfEhD|B`NkAhRnDxYnKnc@lH|[|ItW?fQnDzK}TfCePjDoVa@{MxJ}f@fC_QfQqRtHwJnFiLnFsNbAuCxJ_JjDcTfBcIfCsY?oKvI{MiCgPjDgp@hCcx@sGov@a@qRrVaMvIwJ?qGvJsYtWcI?qRtH{MbAoRfQsNa@gEsGjHia@hA}LuCePvQiRyFqVW{KuUoc@p@_N?{KgEa]qR_N_FdBiLfB}PoTkA{KgEsH?gQcByYwQkSbB{K_F{KkSnFePrHcB_NgEkDwXkDyFmToKsHiSyJkAcOp@yJ{BuIoD}L_F{KsG{YtCcPnDwIbB}LY_NcImb@uCmTwJqs@_FoFzB{KuJpGuJgB{MvIaMjD__@rHkHgCaMjDiA{KsNyJYmEmDiRcT{KXoFhZ{KtC_MfEiR~WmEhAmEyFyYiHkSePqGfE}LkHsVp@uHoK}j@q@c^nRmTvJlEpGpGhSyYbBkp@gEmEhAqGqGyJoDal@gEuHaT{K`Ma^oKc^gLsVmOeB}W{h@aMm`AzB}LePuf@xXsG`m@dA|IoFdWoc@x_@bAhSuu@_j@}ZgLmc@qG?kZuf@{Byg@zB_NqGkSbBuf@aFsG`F_NaFeB{BuWp@yYcBaNp@{KkH}LwQ{KgEsHymAwIq`@zK}iB`OkVkSwQmE_XjS_F?KOnByCpAeAv@oBp@q@e@aCj@}A?uEd@sDGcDj@kAXwEj@sHMkDuAqCDqCVoFuBcH_@cDRoF?kDPsD_@mELaDMqCc@aCEsHaEkDaDwBEmAlCiDvAcDjA{DM{CzCkA~@Y\\s@^cA|@Gd@k@`CmEnBiCtCmBjHiCPoBsCaKiDqNiBkLgCaGcCoBkGlAgDtAk@Ne@O_@N]Y_@Pq@s@{BeBsENqH|AeGmBmE}DgMyCgEiGgMqU}@yC|IaGnBeIWgJcBgJp@eIvH}ZjF}L|BsOdEiKnKcOfL_UhCqV`DaGjO{a@bRiK|Ys{@iSiRlVio@mf@kb@hSyo@jO|Ep@sHpGQvh@kSvJ`@p@gCrEvBxDkDfEnFX~EjHeIe@kD`D_UhC_F_AgCwF{KxMcOoBaGaTuPwQkLqWkKwQzZqPmEiJiDgLc@uChCsEfJb@zC_MjS{DtAeG~FiJiD_OkDyDfCiJnTmF`GgEdIgClEuCbHgE~FeGfJ}BbHc@vBaDdA}PtP{KvB{D{D_FoFcBgIsEiD?uAcB`@k@mAwAz@KkDcAmBoBmAp@qCDkH}@aGb@mTj@}HuCgFuC}LoI}ScBkDoBr@q@{DlDc^mDcOsLsOgEyC}@mEoBeBJoFgFaNmEsKcGsOqB}AcA`@oAq@k@s@\\oBj@YQyCwA{@iBz@aCwBwBmAc@kAuCtA}AuAWmADyCp@aCPyCaDiKaE~BeF`@aEcA}@mEuB_FEmEmEaDe@wBoBwBe@uHaKaV_HaGeNcH_MiDeGhDJiDcIqFKqGwAwB|@{DiA_FwAwBoBbAiAeBJsGbBwJcBgBwAr@cBaGXiCzBq@nBs@|BxCzBkDhAwJ|B_MnB_GJmEcA}DqAj@K_Bj@mBq@a@w@p@k@a@d@s@VY|BXzBYlEwF_FeB_@mHkGaK_FuAkH}AcQ|DuBrDaCjHnBjDbAlEv@zHE|DJjAQfBqAs@w@oB_EmI}Br@gCdBq@nF|@dAcA|A_As@iA}Ew@Xw@c@cAX?`@nAdEPbA|AlHk@bAi@Pw@{@iDwEuBoBQaDyFz@sDtAgFX{AuAkA{@}@yCyEs@cAeEVsDJkDK{@RqCVs@K}A}AkAw@Ve@{@KsAaE_BoA`@_FH}@a@eA`@{Az@wB`DcBwB]oBxDqVv@yNLyQh@aGWcE}AwEdAuEiBkHwBaGmCyCEkHk@sDVeA]uAViDQyBcC{Dc@aG\\wFWgBaDmBkAqCKqCj@aCnAwB?uAaBuAGeB^gBrDiDRkDtAsDQgFyD_F_AX]s@qA`@DkAhBuEj@{CEuAhCuEPwBq@uAW}Aw@cAPgBvAmA|@eBtAgBd@kAnBz@|AlErEFpFoBhB{DbCmEPkDp@oF_GcAmCoBiCcHtC}D|AmBGa@p@mAjAQtAa@iBmIuAk@cBz@iBlAoB_Ce@sGoAcEJuAwA_F^oF\\uAWcDcB_Cv@mApAaHEuD{DgJDkDjAeBhAiC?sD^wBDsDcBsDtBz@d@}Aw@eAb@oJEqNv@oBbBeBfDdB|@FXj@bBYv@Y`CgFDkAvAuA^oBnAaCp@eFk@oBX}DbAwBwAkDEwFcAgFj@wFK{KD_JrCmLF_J_AyGeGmHqEmEYqCd@uEj@wBzAsDR{DqAmAw@wBiAyFj@iDzBwEP}HbA}Ix@_FGsDRk@e@{@?}AwAcAj@}AKyBw@a@Jq@bAeARwBVoFq@aKmDsDoCaCiAa@q@Pk@k@Dq@}@wB?cDd@{@nBmAK{@d@gC|@_BnAqCj@}EuBuEE_FeAXRmAtA{@d@}AD{@bBmE?qC}@}APwBp@s@iAyCJgBpAkAzAFjAz@zAs@dAgC|@mEDkGw@qKcC{KmDuL_EeIyEeAuDwBEkAqG}AqAcD}FiGiBlAgDoBe@qCcBsDWqCk@NeAa@LqCgD}A}AmEb@uA}@cH{AaDoDgBuAeE}@mIoCmE_GbAoCbD~@hC?p@k@r@kAi@}@k@EcA{BuAE}Aq@wB|@{CbAj@nBk@pAlAtAlAvAI|AsAhAyB|@wB^cHPgCdAsDYgF}AwBEuHcBmEoAuAuBgFmEq@e@aCR{@b@a@K}AuCgBoAeIe@kH}@mA|@wBv@uAJyCw@uImCqQiB}EqHiGoCcHgDuEgEgBaDkHeFyCmCwBk@mEV_BzCeBlDyFpG_JxEaDp@cA|AFlDbA|AG|@cAv@VnBzChCp@dFkAvAbA~E`@|G{@fEqCnBiD~L{GxFqCrE}AfD{@bJFpFyCtD_FrCiGfEwBpImAxD{DxEmLhAa@vBeIVqG|AqCbAiKvA_BJwB}@{DJwB|@iCw@wBoBePd@_C|AY|@_Ck@{@wA{@DeEpBk@M_CXa@bBxCzCxCtAO^{@PmEpH|APiCdGqCj@Pe@`D|B|D|@iC`Ci@jA`@SfF?vFj@dEnC_Fp@aOSoFoAk@cAy]oCwBEoBnAsDvAiGw@sDbBaC?cAj@k@Y{@v@uA^XnBcHe@eBPoBzCO^mE|AiCtAkDi@kD|@qCfC|Dv@k@pAr@lEs@zBkDbB{@zDuA\\}EuAcDGmBvBQ`Da@~DXq@rD|A`@pAuAVmAv@wBtBq@vAtAhCIbBX|@lE_@zGpAnBxDcHdAuDv@oFlC{@`DoBnDaDlDk@j@a@nC`ChBa@tB_BnAYj@bDfDi@bCk@pFa@|AXhBvBzDuAb@gF|AwIhB{@bKdAlCqC|B}DfD{@JqCtCgFnBi@|IvB~E}AzJGjIh@`D~[vHdBpGuAhIeIfEwBfEs@zRG|HwBd@}H}AcHzDiCbAyCuCwMp@wBj@{@nBnBnBzDpAvBv@bDfEwB|@z@tDmAtBoFtAaDrGiNnIFjAOfC?~O}OJ}HcAiKwBwBi@wBq@mE{D_Fd@`GbAzDjAfFlCzK]vEcBdBmE{DeGeAeHlA{D_CsEmEyDjAuCjDgDtHsE{@uCqCqAq`@{RlAq_@hRwGFwHtEsGfFsDhGcC|AsEj@aCrD_Fz@oDtEyD`CmLhGqAkDcJQkG`C_GdBmEcAaCsDw@}DyEHErD{EhKuBhCkHpCo@a@oClBgF{@{AcAyMQaEsAwAqCkEuAgFwIgD}AcAqCmEuAoCyC_GmAw@_C}@_Bp@eF?_BqAi@FmA\\aDq@}D^iDJkDw@iJbA{Hk@k@?eBbCiCPaDXqCp@k@zA{DbDaCnAqChAoFFsHSuL}@kHoByFaEuAoHXLGfIiLyBcGsLaIiFc@yDiG\\}EqBeECwBnBkFoBuAp@mCdGqGnAqEReC~IiVtEwBhQY`Fa@hEJ|@gAtDpNjFnArBDrDqFKmIp@aDtFcFlFqJzEe@`EeC|IgJpCoBxBcGhA}H?_Lf@gBGmCTsBvCmBj@kBtBiCtCeGIw@h@mBl@oBcBaCTyAbAkAUsByB_AS_DV_AUkBa@Pg@kBv@{BOeBNoDS{@FyFaAqAk@cNm@mCi@XWuEgDgFo@mEOcDh@{@`D\\zCiBnBcFViCfAaBlEmCbAeBFgDgBaEz@e@}AeK|@}AxCwB`@eAhAw@pCi@lCyAhAgBt@qCZeDy@mJoBaG_C]Se@SgA`EmLbA_AzCtChB]~BfA`DhCnBCzC]jEQ@aBiJ{ByAd@iCkFkB]kCiEe@oDH_A[}CVcD}C{Dw@}Bc@TkCwDa@cFaAkAg@wEWiB{AqA]uA?kF|@sFaAoD|@qC_CwGBoSf@eCzLqTr@i@zKVpDm@rIwIjFeRn@G`AFfD}A`A|A~Ar@`CYlB}Cf@qCt@o@xAr@|AY~AtAnBTdEs@RwDh@k@jCuGr@mEj@gJAwCzCuNLiI}@gFqDiKcDwDgAsBI{@To@AoBsCgJqCsBP_A~BgBZcEk@cB{AeB\\wDhCwChAqC?_EcA_A_C{EKmGl@cApA?TgBk@eB~AwBa@eCl@kQ_AwQ{@cHmAkFeBe@UgDkAkBfAmEKyCmAo@e@eBdDqCjC?rBo@~@}ASgDzBqBxBs@zOmLjCeBxBo@~FPh@yAxCuATkDT}Ac@oIlC}C?_Al@|AlDpAZxIvF`ErI{R@q@bBoB`HpAn@w@sC_A{AkByBa@wEl@e@sBlCaOnB{IC{BcE}FuD]]eBNwBhAyAlBaGjB}AlBU`KoFpAkB`C}AdA?l@UhCKxB}ATkBbAcAp@UdFcJ]cFZoDq@aB?w@bAaBdNsGdAuC|AsBnEqAn@q@LePvB}CrOcFhCqEzC_ArAcDbGaBx@wBzEeCdCmAnBaD`P}H`@v@t@yAa@sBVqA`@F^WY_B|AiBt@?xAxAj@e@OsBpC{@n@{@S}@|A{@Rf@r@]N_DiAeBCuC_@oDaDs@k@mEZe@b@cDp@]L_C]wBvCyD|@wFjAgJnB_H|DwGEcE^Qf@L`@wBkBJr@yAEiAVcAKcAg@\\I_Ap@_BlBaByA`@FcA|@w@NmAfAi@OcDy@b@EmAh@]Ea@y@z@Ik@Di@`@o@m@eBiBh@yAuAe@kD\\yEs@kH~AqEn@qL~@cAc@aATsAf@?Kg@Fm@b@k@h@_CAs@g@gA\\]nBeEdAqCCs@`EiKk@iATGl@F[eBtCyHv@gAWk@lBqAn@_CjAeCJn@w@rDp@Cd@yA|@yAhAe@NUAqAPm@|Ac@`AkFVHm@pEx@sBtAwBdBeClAqAwAoHRs@FLjBpGoAxFaHdMzHrKzGp@lAcEtBmEb@NzAgCeB]bBwG\\_JpA}Ej@uAdBaNc@u@fA_DiDkH_F]u@r@?bAUrBcEpAEuAlAqAl@Xt@cDU]uClCOUhCeDtC_AP{Am@oCv@iAqDUE]`EKZeCq@a@f@{@bAyE?eCfBqN_@e@RmEv@sFrAyAhAqCvAiGd@iAIaBPo@x@kFrAqAjFgNT{BvBgDbAYbAgB`@cCd@_AhCgDTuAbAgDd@mBPsBhBcHh@qCbAiA~Aq@d@mA|@o@t@cC|@uA`@aBt@FtBa@tBh@pAhAKbA|@`@Te@vDnBj@fChBlCtBpAn@Ul@XhBqAoGaQWiATyC_@uAdAmAk@_Cu@i@?k@^a@Ok@iAeB~@iEd@GQeATgAP}AoFcFF_C]g@N{@{@uEf@?L{@Si@n@Eh@L^GnBdB`ATn@o@tAwDd@qC~AqAvBwF\\sBdAmCPkDDgDs@qBq@g@p@gCZaCf@gAl@_Dp@}AhDgLPoDDiCTGj@o@j@]xAz@`Ad@jDXlDyAdAmCPeB?a@zLpAdGVdHj@xA\\bC|AhAn@lA?hBR`AsFqAcAiFMKXeCOaTcBUw@j@m@hAeGHsFOoDk@oByAr@eAeABmCIaHKaCaAmCk@iBuBaCUcA{CgAuDw@a@{@[d@e@e@Ep@yB}Ad@m@Iw@j@a@KaCH_A~AaE`@wBMwBi@}A^qA|@m@jAg@bByEe@eEbBiGOgA`A}Bp@kCFoDjDqJxBiIp@o@OK|FiLd@gEOw@Tk@NkA`@cB|@{Ig@aHw@cFsBwBoBtAu@k@HgAZqAl@]`@o@h@?`@Y`AOS]zAa@YuAjAcDOoB[i@_CQ{@{BHuAv@{@j@oBl@gABgFYsDaA{D}@mC{DBKe@v@cBpA}A@{@R_AJyCu@mCKmA`@cCtAkB|C{GH_Ck@yCjAsDh@iAt@oJ`@wGNmLVkAtAyC@aCUuCJeBh@aCIyCKwBd@}HG_HGgCbAkFUuABw@OcDCyAq@eBZ}Dm@uNq@}G}AeGUiAkD{Kw@sDoAuCcBmLw@mBuAo@q@yAEkBy@mBw@lBf@iKsBzBg@w@_AxAW_ATsBT{@j@}A[o@hBgLKyAnAuJiAyCEk@yFiD_AnAWi@r@iCa@gA}CNoDhCq@e@HgBd@mCYyA_BmBPgDvA{Ir@eBUgBj@oB?w@RiBhAoBAmAe@kCFsBn@}BT]zKhR|AtCjCxD|B`Br@n@rBRpAlAvBbDF\\nA`BlBtC|@r@t@IL_AwCsByAsDlEsDdB}Ev@eGuCwEmAn@g@`B~AlCkG|Hw@cA}@t@e@i@lF}HwJwM~D{FeAyAgDo@eCpAiB`I{@l@_CGdGlKQ|@eOmW@a@p@FhBeKk@qAQqAqAmB_Ad@mFiIgAl@UYTTKo@Zm@CyAUiAe@iEh@mBEiAgBeIcBsBsBs@iDXwBxAk@]eCj@oCeC?gAsAaGEoBT_CsB}LQyDoBaHu@o@E_Ck@cFm@oB{@mAe@kAR}DIu@|@{GT{Be@mCKaBTaCX?Fv@XB@m@X{C~A}AToDv@oD^cH@}E^k@NaBEgBk@_AZkAZUd@ClDyA`BoBZkBDyASuAWyAd@{@G]`BgAnAcDdAeB?yDg@e@Fe@d@YVyA\\g@hEgADw@^]nC_A\\uCU_DiA_CcCFkLaK_FbBoFg@qAqAoC\\O]~@u@@]_CeAeBn@uAo@p@i@]]T]I_BJm@Aw@xAyAbCuAp@e@@w@e@_AN]v@BNnB`@Jb@iAb@]`LrEtG{Th@GTt@pHxFU~@kIoFoEdTMhC?`BZJj@aB~GdGhAs@qBiEv@w@zClE`Az@hA^|BUbDw@b@?rEeEVs@hFsHbBqJXmEqAkHq@mGR]\\XxBoFJyAbHd@|CJzCkA`BqCfHs@rE}Cd@sBsBoFa@yB`AK[yEmB_FaEaEgA{B?e@p@FhBoDp@i@b@UDo@lA_CPcAjAeAxADZ]a@gBf@_CxA{@RaAhAq@dANrACp@BY]lASfAc@`Aj@~CB`@UpAmGDiC?aIMuGi@eMOkK[mE{A_Jy@cJ[qEgBuJOiBHiCmEe]sAaIuCmCwBz@sAgAK}AqA}AiAmAo@{BHmAf@wBA{@Js@}As@g@yAq@e@sAdC_@Yk@tAuAh@c@uAbCeBhBiCp@FrF}GIuAhBgD?mAdA_A`@eG[_Au@`@mAsDs@cAIo@`AyCTe@p@uCC}@v@kCRqE|AqJr@gFAqA`CuGt@k@tAeBtABv@Qp@q@nAX`EqCf@_B~@sAp@_@Vi@^Tj@U\\P`B{@P{@d@aAv@OJvD^\\hEPpA{@|@VZhABxAp@T`AsM_MgHiIBsBtAsJjHkCpCwErFe@a@hHmIrDyCcAgDq@mCw@mA_A`AkBg@I{@B_AcB{B_@NoC_EOyAqBg@G_Ag@z@aA_AWm@w@l@}AkFr@oBLuE[aBsCo@}@uA_Cs@iBmB`@mAq@kBXS_@]N_B?wBgAcCeAw@^a@{BkHyBYi@yA{AmAq@}AeAuAk@`@cBgDLcAOmANiBTiAi@mC_ByAkC_AwBgHRs@v@uKb@w@c@gB}AsBiBa@[s@yByAw@}ASsBZsDQ{BcAeC{@sFN_Au@wGd@w@cAwBe@oDOiD_BmCq@d@a@oBVi@Kw@K`@Us@`@cAgBcAoAcHr@gDaCoMOqCaBwDm@yCUaCiA}GPk@_@s@k@uC\\wBc@yCLo@u@}CXs@c@a@Rs@PTp@cCQs@p@w@`@mEg@k@?sArAaAZ{DEo@Ti@Js@eCiGqDaDoCg@o@yA}DTq@mABq@o@sE?iBGiAVi@]eCGcCqBqAMmAy@cC\\{GdAkAf@wBjAqAc@iAKcAiCaGy@r@e@qADaBTe@[iCg@_AVo@KuAv@i@PoBa@s@?mE[w@JyAw@uCGcCTuAi@iJk@yCaCiK{@qAAiCeA{BBkA{@qAeC_AW{AgAj@qAmAoC?w@wFTMNiBk@kH`@gBa@i@`AqAj@kHY{CwAu@t@kBe@o@yBj@MeAeDsBeAyETs@_BeDZeAKyCo@aBi@h@]wBQPoAuFaAyC@mCh@i@TcBl@DCoDj@yAEuAk@g@Lm@oAeABuAf@q@Mw@ZCOeAl@e@QgAIqAw@o@Ws@cB_AMgAi@r@y@_Di@n@YyAf@w@U{BrBEBgAp@eC?eBu@qAQn@o@mA^OJaG`@uAA_DZwBr@uANqB`@ILr@ZUe@sBk@yAXw@_@cAPcAoBiAKqAw@aB_DtAa@~@s@{@oAtA]_A`@uAm@iEEmCk@eDk@o@CaBn@qE\\iAp@e@xCaE|@]`@{@K]v@]Hd@f@SImATs@d@]~IcA~BXfF~@|As@CyCbBmIrByJdCcJl@mAa@iClApA`BcC?aCZq@Mw@b@g@ZiDUw@PuCe@iHmAeIgE{O_GcJwB_CiDqCmD]sBh@eBhEyClC{@`DcBtLb@`@eAbJa@rB}@rBu@\\A`@_@\\?gAuBxA[\\Yr@uAs@o@uCkCcDaEgA?{@}@qAk@mGe@a@a@iEj@o@N{@`@XTUpCcNc@]tBeIIe@bBkG|@cApAaBpAo@|DcCkAqEuFpCcA}@LoCBiL{@aGkG}LHe@VGTRTGIaB{EaIeCjA_@r@}DF_@a@oG]c@hA@{@oEyAIw@kArBXcBgF|AgChCiBlAiBQGz@a@LRoB_@XBF?w@l@cCpCkFNF^w@Yi@bBsIT?Hi@aAmA?s@sBUGj@_@s@{@d@GqBF_BeBr@e@}AReCeAcA^cA?k@Zs@g@q@hAoDa@]q@`B[i@?s@o@XLw@q@h@v@uCU]o@z@q@qAm@hAq@`@e@_A]`@u@cABw@l@yAN{@|HqU]]FoBrCqGgBm@hBmHsBTvBaKZKFbAvAcDp@iIHnB\\o@b@HPw@TINlAp@r@?_Al@c@d@XhAzBhBPrAmAz@uEbAiG_AaIa@iEkAq@s@l@gAoB{@q@}@~BYkBa@pAm@\\u@oBw@uKKg@e@~@AeBe@k@YyEg@h@Wa@u@eKp@~BNcEv@uA_@gHXcFi@sFMk@[~@e@wBQLPcB[i@Ti@FeEj@e@DiCpAfAjD\\z@v@l@SCmCpDg@z@kFtBuAKoDf@{BGaFq@o@?qAxAeBpA]lEl@dAHpAeCj@?Nw@f@}At@}CrA{AfCGzAm@dBcDv@qAjDf@xArDt@jLrJ|DlA`Iq@|[tCe@lAe]w@aRoEqCHsDzDeBlMwc@e@k@nD{K[mVkMeKiAiEdA{@cE_LD}BZe@fAF|AvBtBfDhBtA~C`@DyAyBa@uBaBgDsGFe@c@oB{EuC}DzGxAtj@t@rB?`@YTX`@v@LjAaA?m@VYDw@tBYH~@fDGNtEgAj@Br@w@h@DlAr@EcBdEg@a@aMzVg@o@_H|O_BxAeD]qClCcApCgArAqAm@eDrB_AnDoCxAcBo@sAtAq@e@q@~@aAw@wAlAgAeEs@i@_@h@LtA[n@c@zFeGnK{BNO~EIkFm@yCYcOX}AK]MyAXg@w@yTS}A[qFq@oAw@k@NGk@{BgAgFqDgJg@h@HqEf@e@AyBkAcA]r@uAeCL{@cCiB}DmUd@_Ae@uAPe@cAuA?o@U{@PCWoBPe@g@yCYxAa@sDc@d@eEmRiApAoCmLZ]_@e@T{@GiAsA{BcCoBUoFd@cAS_AmAt@mCiICuA}IgSGcCe@ToByF?i@kAaEk@Pa@iCv@aEcAwDiArBuAuCeBmAiB}CN~@[\\qA_CJo@w@`@kB}CFs@i@`@qAuANa@eAj@]uAoNiGKo@u@`@BkAgAl@wAiB}Dw@eDeABm@a@d@gI}Ci@\\Ko@^m@mMeCIi@ZYRwB{AuFFe@c@a@[yA{BuAcFFUe@eNgBC_AmAw@]xA_Ca@~@sHUsB_Ao@u@qCeCPoAcHmAh@aBgA?sDoB]e@{@rAYNkBkBi@Sa@rAYw@{@lBXCaAj@a@Km@t@E`CqCf@XtCgAuBaCoC]?u@mDUPo@kBKeCiAUr@wBKWw@d@o@y@gA_Ah@CmAd@GIcAs@o@oBOCw@f@]}@w@}@uAj@FhAe@oBk@|Au@r@wC_Au@\\yAp@s@j@CZc@aD{DQmCYxAsBw@^a@mByAyDoBCkAuA}A]{@n@IU_Aq@d@_CsBg@{BeD}Ae@_AhFpArCgBf@Pk@}DJ_AMcAl@a@Zd@V_Dj@]hDCrAkD{Ab@s@aA}@f@JuCyBk@ZeE_CiDeBwIElAiBs@r@zDuB_ATaBwE}Dd@xAVjBsEcFp@OE}A_B}Dw@n@IeCoByAPeB|BfAq@cAEmC}EkFp@k@sAmEgA{@?pAq@_ANo@q@yCTUwAiD`@?JgBj@T`@yAoB{BHeC@kBm@uAXaBmCqCmA}ANo@bAv@cA_C`AUhAm@a@qAt@FD{ByBkB{@j@_CoFXg@rB~@MkAd@IXcAsBi@UqAvAMx@j@QkBf@Gd@s@ZBHa@jCbBr@UyAiAw@sBsAj@D}Ae@a@K|AwAqAoA}C?oB[yAaBeAw@wDAaB|@NHYeAoCd@_@QsFwAn@k@iAuB]g@uCZyC\\{@k@{BLiAkA{DNyAOkB[s@d@uAIq@^s@a@wB@{@QqAfAgAIqCNsBTY_C}A{@_BROhAbACeBd@MJ{DuAs@mBQg@cCcAqA[r@e@oBgAr@aAgB}@yCaEqIaBeEO{EmAf@k@qA`@]Oi@w@o@AwBq@gDw@gAh@_B]kCr@l@MqCVKOkB`AF_@wBlA\\h@i@?wBu@}FzkAm@pP}LnKpGhIjA~EHzDyJhAkHyDyd@cBoT?oFk@kAD{C_Nk_AsDeM_AuE]_FiCkDe@_CvAgBE_CiBoBuBOiDlBiA~AcBc@q@wB}@j@w@jAe@cAnByC]}Av@k@v@`@\\{@i@eBiBs@cBtAkA~B{CXuAkAwAFQmAh@uA]cAoBcDiBcA_@}AXgBMcA^Yj@Pp@Y?uAj@cA?eA`B{@p@j@zEbA`BbA|AmBv@qCdAiC?uE_@eAq@gCPuAnDmAp@sDKmA?cAxDeEJwBoAPk@{@d@sD_@oF{BeA_@kDw@eBwA}AXaKVqCWwBv@cDPcA{Jk@e@_C}@NEkAJ{@W{@Ya@|@kDj@Nj@uA^wBqAuAuCq@oAeAwA_CwGoXe@yNaC{Gy@{DuAeEw@GMwB^cAv@`@JgFq@G]k@w@a@oBwFDaGhAwBuBkDiBcAaEkG?sDoBuAQwBq@H}AaG|@k@?}Ev@h@DkAyDgBkAiGLs@w@{@eA?}@aDj@sD\\{@?oF{B_F?qCcAa@SqC{AGuDeEuAqC?cLqBsGXsDq@}EiAiG_AuA?wB]{CVoFuBeBEwBq@eAVcA?mEbBsDWuHqA}E^eAQ}A?{@v@a@nAtLjAhG`BnBjAh@|AcArEzOlEsD_@s@d@q@|@rAd@W|GxGtD|DDuA{DeE}@gBQgCb@}AdAtArEeErDsK^mE?aDh@gBWwBJiGj@gBEwFwAoBw@cEnCeEDyC}AwEJuA~@b@|@c@w@uIyEiGiBsDiCkGeFeIsEgCoCX}AY}As@iHYkGhCwBvBk@|A?vBd@nFWdA}BtAq@rAFdAn@`@p@Yv@j@WjAJz@uAz@q@r@wA?w@qCiBaG}@HK{@_AiCmCyCeA?q@z@}@a@?k@j@a@?cAgE_BuAmB?iC_@a@VwBaBwES}E}AuE}@gBcAs@p@a@k@a@jAgBqAgCKmEq@gJPgBQwBw@iCb@Y]{@p@i@\\}A~@YSgBEaDp@mADoB]uAb@kA?k@qFsOkAGiAoBuBeIoCmIcBY?s@X{@}A?}@a@}AQ_@bDoBGQs@uBs@cD}AuAkDkAeBRc@|@j@YgBFcAw@oBe@qC?uAYeBRgBeAq@dAc@MyCLoFv@cAwAeEaCa@cCuAuB`@uBlAeA`DiAOEoB?}Ae@YiB?oByFJcAdAs@EkA{CwE{CmBSuAsD{@cBwBoB{CiAgCJgBkAkDqFaD{CqCkAmAoAeEk@sAuB{@k@eAQyCj@a@|@YwAcH{BwBeAqCX_C_@aCXi@_@s@Ds@c@{@P}Av@kDQ{@e@i@w@a@q@bAw@oB}A}AE{@p@k@cBq@?uA}H}LuB?cA}@}@{DkGmEkAa@PoBEmAeE{@Y{@kFOYgBuA`@wA}AcAuASgCuAiCuB}AoDGiBk@sCoBwBwBq@GoAuAk@cAcAkDqAoB{Aa@aDFyFwBmLoJiCeAeEsDgEeBgDmEcBYEmA}AoB{CwBcAHcAeAq@oBqHqGwF_CaFuAiAXk@iCiAwBsDcA_@`@k@FiAaDeFmHsFsDoC}EwFmAiBs@E_CcC{@eF{@kGgBiBsD_EuAyEsDiC{DyDqCgEuAwANi@eBiXwMwH?aDcA{Cp@uAdAkArDoBz@k@iC]`@kAHoA{@}@rAq@Ow@fFiBnBnAkDd@wEq@vBq@G|AkD?mBw@mEq@?X_BJ}ES{@v@eAFmBe@mA|@sDiAk@PcAuBs@wAsHcBa@WqCiAYJs@}@{@}AQKq@e@IuAmBgF_JuA?e@Q_@eEcAyCcAYaDmBoAuAaFFo@}Aq@p@DjD}@|AuCj@Yr@o@Iq@{@?kA_@{@?kDrEgMw@cA?uAiAwBe@i@}@cDkAi@uAmAcAcA_A?cAuAoBeAcBWaDgBiG{DgEk@gDqC?{@w@s@qAG}@a@w@mAuAq@k@?aCkD_Aa@c@s@q@gBcAPqA?aDiCiAi@}@uAuCgBaC{@e@kAeFqCsDqCw@oB_HcD]sA}@s@eNyJw@gBqA}AoBcAc@}AuBk@sFcEcAQ{IkDcBqGqFsDgDY{DgBgDjSk@tAo@XYkA?gB`EiRgKmI_UwByFxz@i@uWDyN|@mLhB}LhBeI|@kH|@}S}AkDKqC|@mEd@iGEsHJ}OEyUmLkP{I{K?wXzBePeSkSn@iR{Pmb@bIoUlKyg@lKhCjHa{@`IgB{Bwv@q@ka@pNcPzPqUjH{ZdS{KxTqUx[wXpq@iRxi@kSlDcAV_\\jAst@?sqAY}j@Xkp@~Eia@?wf@mDg`@sNse@wMwv@yMagBWg}@Vyv@xFcm@fLwg@zI}LkAiR{Puf@mR{h@ce@{fAoYekAqc@k}Aae@_wAgZ_z@VaGbBwIhHuAjHq@tHeIlFmLxD{R~E{ZmDyYoIkZcByYbBwQ`KsG~L_GpGiJjF{S~LiY|GiKxF_UdEoMdGmEhHr@dGfCfEpFdGjSxDpNpGNvFoF~EaGpIcAlKhClRdIzImEpGuHtCgJ|@gJsCmL_VwXwH}LKgJp@{KpGsO|Ga@bPyBdNyCxFoF?aO}BqN_DyJc`@uHmYqGmD{ZcIyYmDuWY{h@w[uIai@{YqNkb@p@c^zPwXxFuf@_Mc|@kVaN?}[p@oFhCeAhHtAhAmAnDGv@uAhBkAfBc@dAa@|@hCv@|AtB_CtCmE|M}L~Es@dGh@jFpC~[aKpUqVtf@sGn`@ia@|s@yJ~hAwItXse@ng@or@daAkS~hAeBjVa{@|^gzA~s@_NnnA_iAdeAyv@hZwdAde@{ZpGcOqu@{fAtXe}@rUi~@deCmEn`@ehBlVeQld@}x@`m@k_A~eBsGrn@gC~w@_wA~^en@hSwIdPxYvQuIjHuWiLmb@mVg`@kV_]kHi`@hAm`Az[wg@r`@ia@hl@_\\d^_iAXwu@Yse@fWmc@dP_k@p`@k|Ajs@oUx_@`@jAha@nk@tHrYka@l]sH|TvIjeB{w@rr@{h@jAyw@xX}uAxFwdA}T_]|Iem@`X_]t\\nFzFbyA|m@l`Al~Alq@n]pdFvn@?b_@pUla@rH`_@~Lp]d_@j~@dBvdA`@jZlEzu@xYla@tHzgAfQph@mEfb@jb@fm@yJtk@xeAzMvu@~f@jb@xn@jSb`Anc@fm@uf@nVqnBfI_wAkAqpAf[agBbM`@fPaOpVnUx\\m`AiElb@bBvXnDd_@Xps@`Q~MnVjp@zQbyAbkAa]bXeiBrGezAjnIot";
	var eh_points_kosta_gabe = "wbuhGnjhHhBeI|@mH|@{S}AmDKoC|@oEd@iGEqHJ}OE{UmLkP{I{K?uXzBgPeSkSn@iR{Pkb@bIoUlK{g@lKhCjH_{@`IiB{Bwv@q@ka@pNcPzPoUjH}ZdS{KxToUx[yXpq@iRxi@kSlDaAVa\\jAqt@?sqAY_k@Xkp@~Eia@?uf@mDg`@sNue@wMwv@yMagBWg}@Vwv@xFem@fLug@zI}LkAiR{Puf@mR{h@ce@{fAoYekAqc@m}Aae@}vAgZaz@VaGbBuIhHuAjHq@tHgIlFkLxD}R~EyZmDyYoIkZcB{YbBuQ`KsG~LaGpGgJjF}S~LiY|GgKxFaUdEmMdGoEhHt@dGfCfEpFdGjSxDnNpGPvFqF~EaGpIcAlKjClRdIzIoEpGsHtCiJ|@gJsCkL_VyXwH{LKiJp@yKpGuO|Ga@bPyBdNyCxFmF?cO}BoN_DyJc`@wHmYoGmD}ZcIwYmDwWY{h@w[sIai@}YqNkb@p@c^zPuXxFwf@_Ma|@kVaN?_\\p@mFhCgAhHvAhAmAnDIv@sAhBmAfBc@dAa@|@hCv@|AtB_CtCmE|M}L~Eq@dGh@jFnC~[aKpUqVtf@sGn`@ia@|s@wJ~hAwItXse@ng@or@daAmS~hAeBjV_{@|^gzA~s@aNnnA_iAdeAyv@hZudAde@{ZpGeOqu@yfAtXe}@rUi~@deCoEn`@chBlVgQld@}x@`m@i_A~eBuGrn@eC~w@awA~^cn@hSyIdPxYvQuIjHuWiLkb@mVg`@kV_]kHk`@hAm`Az[wg@r`@ga@hl@_\\d^aiAXwu@Yse@fWmc@dP_k@p`@k|Ajs@oUx_@`@jAha@nk@vHrYma@l]sH|TxIjeB{w@rr@}h@jAww@xX_vAxFudA}Ta]|Iem@`X_]t\\pFzFbyA|m@l`Al~Alq@n]ndFvn@?b_@pUla@rH`_@~Lp]d_@j~@dBvdA`@jZlEzu@xYla@vHzgAfQph@oEfb@jb@fm@wJtk@veAzMvu@~f@jb@xn@jSb`Anc@fm@uf@nVqnBfI_wAkAqpAf[_gBbM`@fPcOpVnUx\\k`AiEjb@bBvXnDd_@Xps@`Q~MnVjp@zQbyAbkAa]bXciBrGezAjnIoT?a_EiEnr@{\\pr@cB~\\lHrcAfEvXr@rnBxQzi@zQiC~Tvg@~IqGz\\j_A~T`{@deBqGhf@hClSqGlShRvYcAlH`{@dn@rrAdy@aAp@tXhP|KcBxv@|}@rItNdAdc@_Nxd@tI|g@mT`k@qGvYdPdM`]dXgAn^ip@|g@sVzQjRxd@pGl|@~k@wCdPdXxI`JkCpKlc@dMte@aUfn@{FnaA|Q~k@jq@?xYuIn^cAiEduCfXrGn^j_Adv@zZ`Uvg@|\\bAnS|K|QfCaJja@rKrt@xYd_@jPfCs@naAnHjp@rKj_AbBzx@{Fvt@?zi@zFpe@|Q?hPtV|Fzi@tl@?p|@ka@lf@|Kfc@lTnoAePbU~MlH~i@xY|i@uC|gAbBha@hEhR_]flAq@vg@iE|x@rKztA{Fb}@p@|ZkPbwBhEfn@`fAhCtViCnoAzK|o@bAm[trA?~i@l[~MhXcAjP{v@hc@oaA|Q~MiExg@rKtX|Qb]`]f}@|QzKdBlTb`@bP?nc@fk@jTxrAcAp^uXvVhRoHlT`JlnAbh@`l@?lT_RlT|FrGeUpV}QrcAgMte@yNpG?fn@bh@lc@jc@rGdwBxcBd`@cApf@d_@tVqc@b{@jCq@yg@xNia@py@mEd`@_NnaA`]hXhRpSjE~Qlc@`]`]tKvv@lc@l}Axa@nc@dh@d_@liAdyAjqAbAzgAtg@pn@|KhfAvg@hEbP`e@uXlP}ZsSkp@|Fug@|YiRp[wIzN}K`J`NxViRjXlTlPlTnHvIlPdP|YflAhrDnhDtf@hR|YxX`RtX|a@~x@|YuVr[}MrSgPlPaPd]lThMjTxV{K~t@zg@js@}Kt_C`jAfUzZv^|Kpc@tIzVuIv^oEtSmTzNyZtSuVd]st@~a@_N~YsG`ZnEtSzKd]sGtSzKhp@lThMiRs@uIbRdAfUeAx^bPjh@fAxf@nVf]{KhMmc@jEiRlcAm}AzNe_@vKiRhx@kE`b@cA~a@e_@b}@_j@nPcAvKoT~Fe_@kMor@wCwv@?mT|FsVkEoc@xCiRvn@xIpP}KpHuIf]{KzViRt[`]nXgPzf@~x@t[nr@fe@lc@ps@naA`b@hRh`BppAnsAnaAtk@dPlx@d_@nXfCbb@paAbRa]pPmEjUbAbZhCpH`l@n`@taBjMsIbZtXvc@zKbZhRdRd_@|NtIxClp@yKrt@wKpVdB|i@eBd_@eBzi@q`@~x@cRjp@~F~iAdBl}Azn@dP~FpVpH|i@jUbl@yCpt@?lTwKzg@kEtv@kMlnA_Gre@qHte@qP|\\sHrUW~MsLtXiMjSeFxXeZbP{f@b]kUdQi]dPcN`OkM`]qHf`@VdP}FdPmAbPcJb^eFtXeBbOeJ~MkEzJ_KpHqDjReB`NdFjSpH|LjMcAp@tJkA~L}JpFyCpGeFxJYpH}N`]?vH~FdBpDdBxGeBjGdB|D`G_AdBKxCjEa@xAfCpDt@~BvCvEnEdDa@r@yBjCdAdBnE~DdIe@vBpDfCdBhDlCRYzE_C|D_CuBeBbAeBjEyAnEKjD_AvIdBxD_CtH~B~MpHbO}VrWr@|ZXnd@eNtV?xJqHtXkMvv@kItHeBpGwKzKyGhRoX|LwOjS}Rd_@}V`Nsk@|i@wSlT}NzKjAfQqDnUbNd_@vSjp@eBxJ|FdQiQ~i@wSha@kI|ZwCrIvClb@jIpUeFtXdF|Kr@|i@_GdPwOzKkI~NoT|LqDfQeN~MxCpF~BjDvGeBnTrf@_z@vf@aVvYhMbOXlTeJpF}JlFcR|ZiQvIeBxK_GlDcNgCkEz[jE|w@}N~MqHfQwOlFcRoGwC~McmAsG{VlE{^jb@wKiRyn@`@}JmFkEcOaR?yC{KkIdBcJoG{RmTu[kSqDaMufAelAq@_N}NcOwKcOuSsWeB{KuO{Kyb@gQwGqVqLgPix@inAaNeP{VmDkEtGkEgB{ZeBs[uHgY_\\{Rmc@cF{Ytn@avB`^iRnH_y@vOam@_G_NmTa@iQ}w@kh@}j@|FehBdJm`Aj`@st@tz@or@u[m`AyV}j@oPc^iUue@iImc@qLg_@mX|h@uKzj@wj@pTs[`Pm`@?{m@kb@kh@e{AyVhSeFhR~FbPmA|ZXdPkAdQbNzJyChSmTfBiQa@eYhRcJoFaVbAuKlT?fQ_GzZiEzJ?pVkIbPvKvHcJhSwCzJkEtXpDbPtOzKy}@fuCr[tHnPzKp@lT{JdPuWzKai@re@jAnUtO~MbFjb@Yte@aNhRoL~L?dQkAtXeBxXuKdPaVtHuOqFyVsHk`@a@iMfCqDvJr@`N|]|[{J`NaRtXcJpc@{NnGiMxXmTxKwCzKVtG|FjExCfCpDeBpDfCbFiDjEfC|FeBbJvIeBnr@?lc@}J|ZiMdPaNtHuKyJgY_[wZmUca@}KyVzJsWuG}a@fQkAxIvG~j@iIrf@wKlq@gM~LwGvX_V~z@eYfn@mPue@{N{LgQ?aNbOiI|\\jAbNqDtIgUvIiEwI{NuI}]gA{JtVp@pe@hEjDjEcAvGfCtGeBnLjRoH`P{NvIw^jSyRbO{JlDeB`Op@pVqD~j@~BfQnHjS?rWiIdOyRpGmT{YuGfBkX|[gQuIsO`N_C~M`NvJzJbPiEdP{JjC}JoEmPvW}Ff`@sKlTiIfC}J|ZvGfQtKnU?~MuK|LsSrHmPvIq@fPvCxi@lPbOtKjSjAzY`JfRxC`]nDnUjA|KvGhDbFcB`e@bm@`Ntu@fQ|[lPrWiI~i@qDd`@aJbl@aR^wm@dAc]e`@{NsUyVwJqS`^}FnT{NtXqSqH}F?aR}La]lr@Y|Kaa@`kAgMcBaRpe@aJfB_VkS}F}KeQgC{NoTg`@}MoHlTaNlTbFjRoDxi@_CtWnHxJiEfQqDvIwCpVbF|K?xKjX`k@Y|L{JfBY~MnHrW|YlDfQ|LnHha@Xrf@jAd^aNfRyRnE_V|LoHfQr@nc@cFz[|BjRxRfRhEbm@cFrd@wVkSp@sG_NfB{NnUuGvf@jAfp@}Fte@kTjb@a]iSiIiCwCmE_V|MwCtW{YxdAiIz[uKd^?tIvVfPnH|MkAjS{F`O{NrGg\\b@{NtIuGvXeQbOqSjEqWlEeB`]cBdPpSxJlLwI~QcObFrGnHfQuGtXgMvWcFrVbBtWiE|[wR~[aNnUiEjSfMtWnHlTtVePrS_M`]lDvCzi@bFrd@oH`OgMgBqSpG_R|KmLmDcJvHwChRiEzL~QxJlL`NdBfQqDvX_NjS{Nc@_N|KwCpVjAfn@qDd_@sKd_@VjTbFxJiz@ho@sSrWe`@fP`JrVwC|[q@f|A}UpTsOvg@}Flb@~QnpApDnT|BrHdd@`]qDxZcBxg@_Cfn@oDnd@s@nc@cBd`@uG`\\_VxJqSgA}UoVWyIgMoUyNeBwVyJq@yIyRfAyNtImL|[`J~L|YnGva@tVfQrV`Yre@jTpe@rKzJrb@iClLyYhEcOzJkD~BnT_CvsAr@bPYd_@kPh`@mP|LkPfQiIjSjAtWzYnU`]jDvG|L_Cj_AbFzKzJnGxRaOfM}LpO`NjAtWaFvYgQfP_RvJoWeBwVcOsOcPXiRoHqGuG?yN`PwVh`@_NjScJdAwCrHn[fQvRxKjA|h@dBrIeBvf@cBpVvV|KtGiCpf@zx@bBfQjEdPcFfQaNtIcUhCyRnFyN|Km_@hDkP|K}FjToD|KiX|ZnDzi@q@rWmLlDuZcAoWoE{]wIgI|KrKtWbYvYvCd_@nDtV`Jz[X|i@ytBcjA{h@}LojBa^s`AhDwnAwIuVgCwt@kSr@jSiIjRdBdQeBpG_NnaAyN`k@{d@j`Awa@ha@yJfQ_RpGaFd_@sKtHoHjScFps@hEdO`JpHzJjS}FvXwNjRri@lTzbArt@fz@mTfXvI`YfQvGbOlWwHdQbOpDtt@`Y~y@vp@tIzJfQwR`OVjRuG|MoDfP|BnGva@bOzJoFrZa@lLbPdBxYcFxJuVbAm[`NcFbPeQfQ_NvWeQ^sZjDcU~LuG}KsOqt@_Nsd@kP{Zm[wIiTgCqOnUwCjSkPgQsZsHuVmE{JnFjPzw@|Qre@jAre@eMbAuVdPgIjRyNoEkPwIoS}LyNkDyNjDgXzh@{Uzh@{FjSYrVjA|[uG|[eM`NgIjTmLja@mLd_@}Q`NcQha@gXc@{UxIkPbBkPtGcBiQcFmEgIvIwNrHgI_NyN?}QoTuCbOaJpVoDlS_Nc@}k@oU}Bpc@oH|\\yJzg@yJjSgI|MvCvXtCtWqOiD}M}LqOhDkPrWhEnTdBzZiErd@VxJq@`P}BlShEzi@Vla@{Frf@tV`NlWtWaUz[kPjRin@pGgTzKuGvXoDd_@kAtf@kLjS{UtHcFsWiPoE{FnFnDvg@sKjR}\\mE_J|LpZj}A}B`NsK~j@qZjEk[b]eg@xKsVuH_J{KgTbAaJbNxJvg@fTlq@aFd_@sKfRaFlTqOfP?|Mb`@dAt]nTgIfRcQvIgTlEiEd_@sGre@nOrV?jSpOpVpOzZhAhn@bFld@oD|ZlHtf@jA`l@ij@io@}FkT_o@sViPcAc`@gQsVuI}MoSsKmFgEqF|Btt@}\\`m@eMhR}Mb^wN|ZcBdP}BtHwNjS}r@k~@aUmE_JzK_YeP}M?gIoGqKiCwNqUg_@bA?gRiE}K?sWcXyJwYjDeXoTtCe_@uh@wJwJc^aUcOcX?wd@ia@}r@gQiLdn@}XmEgTfP{Qhb@hEd_@t_BnoAh[?tNha@hf@zYbQlT|BrW|MrVkAvWp@vv@sl@jq@uNlScQ|i@zwA~z@|BxIbQnc@fj@`O|c@hmAfdAijBhEdkA}Mpd@u]nd@_JrV{F_@iEfQy`@tg@ubAlq@cMd_@cQrW_{AtoBcMnUus@nb@}MoaAezAfD_aAgtDoOdBkLuHqVhCeIqGa}@ip@cBoTueAfBeB}LmZmp@?_]rGyYvJxC~@iD_AyB~@wBkAkD~GaGvAqHiCaFoMmE?cIe@wIvJyQ~@}EiCgB_A{DuCq@XcGqB_FbB_Gp@aH|DuH?}KtCmE}@uQb@ce@l^}nAp@mS~Ie`@bD{Zp@uVxHia@l^`GbMvBjWzJpa@rIzFiKp@ePtEmE`DmEhEuQq@{QVki@cBcBvLc@~TaH~KoL`FgCxF_MyHix@W{p@qXqU`HiJ`D{DxJwQzDgBvY{R|B|Dp@qF_AuBiAsbAp@oFYce@uCsPwCqFmHuHWoFfE{L~@wWtCgQuC}T_Js|@e@iXiEuWaFe~@uCaF|@{D?aGyHse@yHwCkAkKeT|Eo\\eW{DiKql@mc@aFePvJa^ss@gf@W}\\wC}K{ZsVe@nFoD`GmFsAkAbAgG`HoB?YjD}B|LiNjSgEtAcBjCuEtAkJdJwClKWhKs@lFq@|KXhKtEdQq@zKe@`F|@rHiCnMYfQ{B|EkArH_JpGsIjCwA{DsEwB_JfDwC~Sr@dBe@rH}B_@mH|M_HlE_AhJuCxCp@zDKdIcDvBuExQoDfCwAhRsG|CcBxDmHfB{BpFwL}ZcDsAmFqFeKc@oOuIiArA_AvP{DrOgPxJ_AjD{BcAiPpNsGzLK`GeKjCyFdIcD|LgE`GY~G_HjK_HfBoD{CqKjCcB}DaHl\\d@dHiCvP{D`P{DvIiCzCmH~MlQzDtE`G|Tj_AcVjdB?rxA_JtPbBpwAnFxo@wArHwCvQgY|p@eIrP?dPeBpFmFtIoBhKgPnTiC`HyJ|KkH|LcDwBaFN?yKkJuPkJ|LuCSuC}Tb@gYbDa]e@yJ?aOpB{QJ{SuC_Vb@eViUcAiNp]kHo@uPmK}@uIcDzC_SwAmOvAyHSiCzCoBq@cD^oBuB?_TeIPeIhDgGrFyHu@uE}DyZyRmFbA{VjK}MPd@rHkAfItEfQaF`HoBzSwL|Ke@|LmDrA}B|D{DfBwJsHgGcOwJiKwJ{Q}IuIoDlD{MuGiE{KaMiReIqGmZ{ZqKsHeP~MqKb@gt@|\\zMla@h^nVsGbO_QzY{MtX?xh@gEbOwJjS_JbO}IjSuC`O{FtGwJ?aq@c{@uaBqpA{B|LuNvXwn@mc@wJaOiAwIcB}KiL}L?uHsGuIyF}ZrGmE?sHiEcPmVfC}TzJyXvXeIpGyFfRaFb@cBxKqGnT|Ih`@sGb_@xF|Lq@lTvJzKnDrUh^|\\lDtG{BfRYzZcB`NaFxZmO|ZgLnF_JtHuCtIjSjStJ|LkOrGfEhRhLjSp@xJaXxXjAxJcMfDq@bNoKhDgEvIkH?sGtHaFgB_Xvg@mHpG}P`NmObOaF|M{BlEtU`O{Flb@nDlEtCzZjAxYuCfQYzYjZsG|IdO?nUhLfRhLvXhLrd@`M|LjH~MhLd`@nVbOfErHbB|KbB|j@dItHxXppAcMtWnD|L|ItHjSfRrYxIlVnUbBbOzFz[cBd^fE`OtCtWtUjb@z_@vrAfEfD|B`NkAjRnDxYnKlc@lH|[|IvW?fQnDxK}TfCePlDoVc@{MxJ}f@fC_QfQqRtHwJpFiLnFsNbAuCvJ_JjDcThBcIfCsY?oKtI{MiCgPlDgp@hCcx@sGov@c@qRtVaMtIwJ?qGxJsYrWcI?qRtH{MbAoRfQsN_@gEuGjHia@hA}LuCcPvQkRyFoVW}KuUoc@p@}M?}KgEa]qR}M_FbBiLfB}PoTkA{KgEsH?gQcBwYwQkSbB}K_F{KkSpFePpHcB_NgEkDwXiDyFoToKsHiSyJkAcOp@wJ{BwIoD}L_F{KsGyYtCePnDuIbB}LY_NcImb@uCoTwJqs@_FoFzB{KuJpGuJeB{MtIaMlD__@pHkHgCaMjDiAyKsNyJYmEmDkRcTyKXoFhZ{KtC_MfEiR~WmEhAmEyF{YiHkSePoGfE_MkHsVp@uHoK{j@q@e^nRkTvJlEpGnGhSwYbBmp@gEmEhAoGqGyJoDal@gEuHaT}K`Ma^oKa^gLsVmOgB}W{h@aMm`AzB}LePuf@xXsG`m@dA|IoFdWoc@x_@bAhSuu@_j@}ZgLmc@qG?kZsf@{B{g@zB}MqGkSbBwf@aFqG`FaNaFcB{BuWp@{YcB_Np@}KkH}LwQ{KgEsHymAwIq`@zK}iB`OkVkSwQmE_XjS_F?";
	var eh_levels = "PFFGCEIGFFGDKEEGFIFHGFFIAFFGEHFFHFIEFGFEKAGFGIEEIIFGFGEDIFGEGF?FEDEJFGHFGEGIFEKEDGFCFFDDFJEEDIGGJGEIFGCDGFFGIGGGKFGHEFEFDFHGMFFFJGHFHEJEDHEGEHDEJGEFFJEHFHEDFGJDACGGFEGDJDDCIEFGGGFFCLDGDDEGCIEFFDGEGDEFFGJBFECICGEFJEGEFDEEIGCEEGGLDFEHECIDEHHEGBHDHFEGEEKFEFEAGEIDGHCEGCOEDBFECEHCEGDBDEHEDEDDCBFCDIBGDEFHEE@EDDIBDDFEBFECDAEDDFADECDHCDDE@FADDFDFGBJEDCFCDDHEDFEBCIDFBEEHDDBHEFEEIEDEEEHAEEHEHEG@EEEFEGEGDMFFFEGGFJEEFEFCDGEEECAEGDFEBCHEECDGKDHGGEIFFFHIGFKEB@EDJEHCFIGMEGECCFEIDFFEGIECEEFFBDGEGHDFHEEHFFEGCGCAIEGAFDIDFHAEFEEEIE@FDEDDFHCFKDHBDFGFFJDF@GEBEIFEHFDEHFDFMEHDDEFHEACDHCDFDEIEGGDFFIFDFHEGEEEEHBEGECJDFDFDECAGEF?GFBHCCJ@GDFIDDHDEHEDFFIFDEEFHDKEAFFCDFDEGEEHFEGEBHEDEHEFEGEJEGEHEEFHCDGIDBBHEEGDIEFEEGBJBHGAGCIDDFEF@EICHAFHCJFEDEEHCGDFHEFEHDFDFEIEEJFDGFDHCBGHD@CCBEJEGEDFDFHEFKEEGCDDIGBEJDCCHECFEIFEHEHFCHFJFDHEFFFDHD@EEI?GDEBHEGFCLEFCEEEHAEGDIEFCFJEGCDEKFHFEFDKEEECDHFDEFEEHGDDGEKEHGDEGIFFHFHFECEHFEGELEEGDDGCEIDCEIDHEGFBJFDFIEFHDAFEICDGCEGECAEEJEDCGEGDGEFGCCHEKEAFBG?HEGEIDFCCCEDEHDJCGEHDEEHGFHEFGFIGAIFEGEGFJDHEDEEHFHFDGAHEECGDEEDMEGEDCFDCJGBECECEJGFFEEDFFGDDHFGFGGGFFELGFGFIFGFEFEIDGCFJGBFGIIKEEFEEFGECDIHHMIEEGAFGHDJEFFCCDEDGDFBGCFCDEDFBCDDFCGFDDCDI?DDIDDBDFCDHDFCDHEGH@CFBEEKCDCFDCDFDCFBDDDDECDIEFFEDHFGGDFMCEE@DEBEECCDGDBAEDE@DCDHCEFEDEGDCFDDFDDCEDDEIDDDGFCDDHCDFDDDFDEDECDDGEDEJCDBFBBHDFHFEGDI@EBEECCFCCCLDFEGDFHCDBCEDDJFHDEFEDCDDCGDGDCGDBEIEGCDGDEEECCJDDCFEEFCEBCJEEHFHBCFFDBBDDJEFHDHHE@DDDFEFDIDFBEELCFFEEHEECHCDAGECEHBGGDDIFEEFEEDEFEABEBIGEECFDJGEECEFDEFDHCFEFFHAEEHBEECFEDGDDEACEDLCEEEGECAEEEFCDEHEDEDHEEEDGDDFEPECEFGDEFBDIFBFHDECFEEHCGFDFFCICE@CCFCCDGC?EEIDEEBEEHEEBFJEF?FEHCFGEDDEHGCGFIDEEFDGFGFEFEEJEGDGHIFFEHDEEEEEEECDKDDGHEGEGDJBBBAECBBACB?FCD@CBD@@CBABBFACHBDCE?D?BBCADBDIABCGDB?BBDBB@DBDGDEBBKDFCDFCCFCCEEBFEHGGGIFEDEDFEFDHECDFAFKDECGGBDICDDECGBEGDC@BC@DAFCDK@DDCDCCEDBGCCDBFCCDDFDGECCCED@?ECCAEBCHCDABDDFBCBDFDCFBCDCBDDGCDEEDHCCDECDECEDDGD?EEFBCCFDDBDCBF?CBDFEIEAFHBEBDCAAGC@FBECCFCDBBGAA?DBH@ADFBCF?CDGD@BBABECDAGDBCE@CEBLCEBDBDFACEBBBBDCDBBECFCBDCBDCDBCFDCBGBBBCECABCFBAAFCECF@DAHCEF?BBD@FED@DFBBBDACDEBCEGCACBDCEDDCBFBEBBD@FBBBBDCCCGCCECADCFDADFCABECAEBDB@EBCBCCCCEBC@FE@CBBDBGCBDBC@CECDECCABECCBDCFCBCEACJCDCFCCCECDDGBBDBDDDCCDCDBCGDECBF?BCHBCFCC?CEB@F?CDCCHABDDCACDFBCE@CDBCGDBDDDADKCCACBGBDCEBCEDCDGCD@E@DEDBECDICDCCCCFBCBDBECCDADGDBEBDEBEEDGCCFDCFACFHBEDDECADGCBBCCCDBDDCADCFDCECCAFCBI@CEDEB@CECBFCCGCAEBCFBDDBBDE@BDCDGAFCFBDDCDHDDBGFDHCECDGDECDDAGB@CEDGD?AFAAEKCECACHC??ECHDEEBFDBEGDGHDEBDDCDDDC@GDEAFDCEGDBECCGBCCJCCCCDCCDAHACD@CBACCCBFD@DBBCECAHBFCF@FDDDFDCDDKCDBCDHBBDFEBHDCECFCDBFBDBBBECBBIB?DDBDCDBACCECAABECCCCCDAHCCEBDBBFCCCFBBDBADBGCECC@EGDCDAE@ADHCDCFDAACEBBCGBC?CBEBDCDDICFCCEEGACDBDEBBECCCDGCADBACHCECADABCDFBCEBDEBEDBCECDCDDCFBDDCCDCDCICBDCEBB@ECDCF@CDCGCDDGBCFHDCDCDFAECDDFCBHBBCBDAACFCACEBCBFCDBCBFDFDCCDDC?CEDECBCBCEDBDCDCBCBCICCADDFABDBCD@DCDCADDCBADCBEBDDCBBFDCBBDC@BCDDCFCDCCCBCCABADAGABBBCCACCACECAEBCDACACACCDBEAB@EBH?ECGEFBCCHDCCACCCGEECADECCCECBGCEBCEBEECCACBCBBDBCADB@ICBCBCBACE@@AA@DBBBDAAHBCECDCCCCBEBCH@EBCDBCBBBDBCB@EDBBBGCBDAADBEBBBCFAC@DBEAAABAD@H@@D?CEDB@FA@DB?CAEKCBC?GCBCAEDCE@AD?FBDACDCCCHBBCACADADC@CDDCBACDACBBEBB@@BGAEDCFADABAABCDCFACCEBBADAE@DCGAC@DCACDAEBDAC?BDADABAC?BB@CHA@?BCCAF?AABCEBBCBDEFDDCFA?CCBBGADDEBCFCCFADBHABCCB@CCACB@H@AD?BCDAA@BHCDCEDBIDFCEDCGCFEECGDDCFCGFBCDAECCDBEBBCA@CBDGBDCCCEHBBACBDBCACAAEAB?C@GCBBD?CCBEABBCBCF@ACEAC?DABCADBBEBADCBCDHBEDFDECDBADDCJCBBAADA?DBBFCDCADFCHBFDFC@GBDFDDECAEAAHCAFBEAEBCBG@ECDDICACCEBCAGCB?CAADBBDCDBFCA@CC@CCBGBD@BAHAB@BCACAGDDEC?BDAAADCFCCCBDHBCCDCBBFDCCAAF?BBACB?BCGADACCDCBAACBBDC@BFBECECACFMDF@C@CHBE@GCCE@DCBCCCDCADFDCBECBBECBBCADBCCECBBACEDAB@CEBDHABEBCCBBFBBCBCBCECADCDBBBCCDDCDBCBB@BBAFCBBBBDBBCBCCBDCAB@GCECDCGAB@BBADCAEDBBEABDDEACBDBBBDBBBBCBBG@BCBBFBCDCCFCBCCCBCDCDFCDCEBCCBDCCBBAICBCCBDBBCDBBBBCF@DABCDCCCFCCDAECCBDBBBDBBDBBG@CBBDCBFBCDFBCACBBHADABCBCBCDCAFC@CGCCBADDDDBBBFBBCBIDEADHCCEACCDBBBGCCB@ECCDHBBBBFACBDCCBAE?C@EHDFACEDBAACDHBDBBDECCECDCACCBGB@CCBABCCABGBDCCCDADDFCDAACBFCDACCDEBDDCADBCJB@ADBCEDDEDBDCFDBBADBDBDACFC?H@ECDAECDBFB@DDABDCFDECCBDCCCBCBDBCBHBBECDFCEBBCBFBD@EBC?@DCBD?HDEEFDEIEDDFEBCGEEDCCGBD?BDDJBDCBDGECBAFBDCAADCCFDBBDCHCBCCCGDBBDDDCFDCCCCEBFBBBDDDJBCBB@BBA@FACB?CCECBECDCCECCBBCABABBEDBCDDCBBBDBEBBEDBCCCCAACECCHEBBDBDBDCBECBCCCCCDEDCACDCCDBDFBBCBDACFCBDCDDHCEBDDDCEDCDCDBGDDCBBCBDCGCCDCCBDCDBCDFBBDBDBDAEBDDCDCDABFCDDBCAECACCDCCCBHDCFBAECCBDDGCCECDDCEDDECDDAEFCDDCCEDDBEDCDDCGBBCDBCCDD?CBE@ECDDADCCECDFCDCBECEBDCBBBDCFBDDBDDEBACCECBDCCEDCDFADBBBBADBACAACCBAEBEBDBCGBDBDCCDEA@DDCCCACBCJCDCBADCDCDBGFFDBGCJ@BBBEDCBCCECHCEBDCEAFCCDCCDFDBDCCFBBDBCGBDBBDBBCFBBDF@DC?BEDB@DGDCDCDDCAEABC?HDCFAB@DCCBFCCBEDDAACEBDCDBACECFBBDDCCCFCCDEDBDBCEACDCECCCBFDCCCBDABDCBIBCDCDB@CHAEBDEFCCFCB@HCBCFCDDFABCBBBECDDCDDCDKC@BDGCACECGCADBBECBBDBDAHD?CCADDBCDBBDCHBBCCDABEBCDCABCAECBBCDACCBCAEHCDADDAFBADDECADAGCDABACABCDCACDFBEBDCG?DBDDBCECCDCDACCEB?D@CBFDADCBEBBCBAC@BFADDBDBDCCDDCDADAICCDCE@CBECBCABEABBEBCECBBECCBCCCBCEACEBDCAEBCCEADDAAECCCBHCDCECGBDCEDBCCCECHBDCEDBCDABCCBCGCCCCCCBDBDBBBDADBGABDCFBCECDBGBBDEBC@BHA?BCCBB@CDBBDBBBADBB@DADABCAECACCCC?DACBEBCADDICFCBGACGEHLBECAACECDBDA@HAFDFFEICFEFGBGBEIDCFCAIADBBEJDFDFHBFEEEIADFCEBDJEBEFDAHDEDGBDFDCDBIECGD@GEAEFCFIDCGDCFBHFBCEJDCGAHCCEGEGIEEHFFNEDECCBC@E@FACECDFEFFGDHDHFJCHGDGGIFHCJIGECI@HBHFGKFGBFGIDFHGBGEBJFHGHGFGEJEEGGFMGGHIJGEDFGCGEEBFGGIFHFDLHEFFJEGHIEBDGEFKHEIP";
	var eh_levels_kosta_gabe ="PBCECDBD@AGAFDFFEICFEFGBGBEIDCFCAIADBBEDJDDEHBFEEEIADFCEBDJEBEFDAHDEDGBDFDCDBIECGD@GEAEFCFIDCGDCFBHFBCEJDCGAHCCEGEGIEEGFFCLDECCBC@E@FACFCDEGFFGDHDHFJCHGDGGIFHCJIGECI@HBHFGKFGBFGIDFHGBGEBJFHGHGFGEJEEGGFOGGHIJGEDFGCGEEBFGGIFHFDLHEFFJEGHIEBDGEFKHEJJKFFGCEIGFFGDKEEGFIFHGFFIAFFGEHFFHFIEFGFELAGFGIEEIIFGFGEDIFGEGF?FEDEJFGHFGEGIFFKEDGFCFFDDFKEEDIGGJGEIFGCDGFFGIGGGJFGFHFEFDFGJFFMFHGHFHEJEDHEGEHDEJGEFFJEHFHEDFGJDACGGFEGDJEDCIEFGGGFFCLDGDDEGCIEFFDGEGDEFFGJBFECICGEFIEGEFDEEIGCEELGGDFEGECGDEGIEGBHDHFEGEEPFEFEAGEIDHGCEICEEDBJECEECEHDBDEHEDEDDCBFCDIBGDEFHEE@EDDIBDDFECFECDAEDDFADECDHCDDE@FADDFDFGBJEDCFCDDHEDFEBCIDFBEEHDDBHEFEEIEDEEEHAEEHEHEG@EEEFEGEGDMEFFEGGFJEEFEFCDGEEECAEGDFEBCHEEDDGKDHGGEIFFFHIGFKEB@EDJEHCFIGMEGECCFEIDFFEGIECEEFFBDGEGHDFHEEHFFEGCGCAIEGAFDIDFHAEFEEEIE@FDEDDFHCFJDHBDFGFFJDF@GEBEIFEHFDEHFDFIEHEDDFHEACDHCDFDEIEGGDFFLFDHFEFEEEGFBEHECFIFDFDEBAGEFGFBHCCK?GDFIDDHDEHEDFFIFDEEFHDKEBFFCDFDEGEEHFEGEBHEDEHEFEGEJEGEHEEFHCDGIDBBHEEGDIEFEEGBJBHGAGCIDDFEF?EICHAFHCJFEDEEHCGDFHEFEHDFDFEIEEJFDGFDHCBGHD@CCBEJEGEDFDFHEFKEEGCDDIGCEJDCCHECFEIFEHEHFCHFJFDHEFFFDHD@EEI?GDEBHEGFCLEFCEEEHAEGDIEFCFJEGCDEKFHFEFDKEEECDHFDEFEEHGDDGEKEHGDEGIFFHFHFECEHFEGELEEGDDGCEIDCEIDHEGFBJFDFIEFHDAFEICDGCEGECAEEJEDCGEGDGEFGCCHEKEAFBG?HEGEIDFCCCEDEHDJCGEHDEEHGFHEFGFIGAIFEGEGFJDHEDEEHFHFDGAHEECGDEEDNEGEDCFDCJGBECECEJGFFEEDFFGDDHFGFGGGFFELGFGFIFGFEFEIDGCFJGBFGIIKEEFEEFGECDIHHMIEEGAFGHDJEFFCCDEDGDFBGCFCDEDFBCDDFCGFDDCDI?DDIDDBDFCDHDFCDHEGH@CFBEEKCDCFDCDFDCFBDDDDECDIEFFEDHFGGDFMCEEADEAEECCDGDBAEDE@DCDHCEFEDEGDCFDDFDDCEDDEIDDDGFCDDHCDFDDDFDEDECDDGEDEJCDBFBBHDFHFFGDI@EBEECCFCCCLDFEGDFHCDBCEDDJFHDEFEDCDDCGDGDCGDBEIEGCEGDEEECCJDDCFEEFCEBCJEEHFHBCFFDBBDDJEFHDHHE@DDDFEFDIDFBEELCFFEEHEEDHCDAGECEHBGGDDIFEEFEEDEFEABEBIGEECFDJGEECEFDEFDHCFEFFHAEEHBEECFEDGDDE@CEDLCEEEGEBAEEFCCEEHEDEDHEEEDFDDFMEGCEFGDEFBDIFBFHDECFEEHCGFDFFCHCE@CCFCCEGC?EEIDEEBEEHEEBFJEF?FEHCFGEDDEHGCGFIDEEFDGFGFEFEEJEGDGHIFFEHDEEEEEEECDKDDGHEGEGDP";

	// Google maps-en APIaren 3. bertsioan erabili ahal izateko deskodetu beharra dago
	var decodedPath = google.maps.geometry.encoding.decodePath(eh_points);
	var decodedPath_kosta_gabe = google.maps.geometry.encoding.decodePath(eh_points_kosta_gabe);
	var decodedLevels = decodeLevels(eh_levels);
	var decodedLevels_kosta_gabe = decodeLevels(eh_levels_kosta_gabe);
	
	var eh_polygon;
	var eh_polyline;
	
	function decodeLevels(encodedLevelsString) {
		var decodedLevels = [];
	    
		for (var i = 0; i < encodedLevelsString.length; ++i) {
		    var level = encodedLevelsString.charCodeAt(i) - 63;
		    decodedLevels.push(level);
		}
		return decodedLevels;
	}
	
	function init_polygons(map) {
		eh_polygon = new google.maps.Polygon({
		path: decodedPath,
		levels: decodedLevels,
		strokeColor: "#0000ff",
		strokeOpacity: 1.0,
		strokeWeight: 2,
		//fillColor: "#0000ff",
		//fillOpacity: 0.15,
		fillOpacity: 0,
		map: map
		});
	};
	
	function init_polylines(map) {
		eh_polyline = new google.maps.Polyline({
		path: decodedPath_kosta_gabe,
		levels: decodedLevels_kosta_gabe,
		strokeColor: "#0000ff",
		strokeOpacity: 1.0,
		strokeWeight: 2,
		//fillColor: "#0000ff",
		//fillOpacity: 0.15,
		fillOpacity: 0,
		map: map
		});
	};
	
	function bistaratuEH(map) {
		//alert("zoom-maila: " + map.getZoom());

		var zoomLevel =  map.getZoom();
		
		if (zoomLevel <= 13) {
			// Zoom maila txikia: EHren mugak osorik bistaratu
			if (eh_polygon) {
				eh_polygon.setVisible(true);
			} else {
				init_polygons(map);
			}
			
			if (eh_polyline) {
				eh_polyline.setVisible(false);
			}
		} else {
			// Zoom maila handia: EHren kosta ez bistaratu
			if (eh_polyline) {
				eh_polyline.setVisible(true);
			} else {
				init_polylines(map);
			}
			
			if (eh_polygon) {
				eh_polygon.setVisible(false);
			}
		}
	}
	
	// Bistaratuko dugun maparen ezaugarriak
	var mapOptions = {
		center: latLng,
		panControl: false,
		zoomControl: true,
		//zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	// Mapa bistaratu
	var map = new google.maps.Map(
		document.getElementById(id),
		mapOptions
	);
	
	//var konpainiak;
	
	function calcRoute(jatorria, helburua) {
		//var selectedMode = document.getElementById("mode").value;
		var request = {
			origin: jatorria,
		    destination: helburua,
		    // Note that Javascript allows us to access the constant
		    // using square brackets and a string value as its
		    // "property."
		    //travelMode: google.maps.TravelMode[selectedMode]
			travelMode: google.maps.TravelMode[nola]
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				// Hasierako puntutik Espainia/Frantzia kendu eta Euskal Herria jarri. Independentzia!!!
				// Ez dira agertzen ez jarraibideen ikuspegian ezta infowindow-an ere.
				// Arazoa: Burgos edo Gaskoinan ere Euskal Herria agertuko da.
				response.routes[0].legs[0].start_address = response.routes[0].legs[0].start_address.replace(", Espainia", ", Euskal Herria");
				response.routes[0].legs[0].start_address = response.routes[0].legs[0].start_address.replace(", Frantzia", ", Euskal Herria");

				// Amaierako puntutik Espainia/Frantzia kendu eta Euskal Herria jarri. Independentzia!!!
				// Ez dira agertzen ez jarraibideen ikuspegian ezta infowindow-an ere.
				response.routes[0].legs[0].end_address = response.routes[0].legs[0].end_address.replace(", Espainia", ", Euskal Herria");
				response.routes[0].legs[0].end_address = response.routes[0].legs[0].end_address.replace(", Frantzia", ", Euskal Herria");
				
				//konpainiak = [];
				
				// Pausoak banan-bana begiratu. Espainia/Frantzia agertzen bada -> Euskal Herriarekin ordezkatu.
				for (var i = 0; i < response.routes[0].legs[0].steps.length; i++) {
					response.routes[0].legs[0].steps[i].instructions = response.routes[0].legs[0].steps[i].instructions.replace(", Espainia", ", Euskal Herria");
				    response.routes[0].legs[0].steps[i].instructions = response.routes[0].legs[0].steps[i].instructions.replace(", Frantzia", ", Euskal Herria");
				    
				    // Garraio konpainien informazioa gorde gero erabiltzeko
					/*if (response.routes[0].legs[0].steps[i].transit && response.routes[0].legs[0].steps[i].transit.line) { // Nolabidea ez bada TRANSIT transit undefined da.
						konpainiak.push(response.routes[0].legs[0].steps[i].transit.line.agencies[0]);
					}*/
				}
				
				// Egokitutako jarraibideak bistaratu
				directionsDisplay.setDirections(response);
		    }
		});
	}

	directionsDisplay.setMap(map);
	
	// Jarraibide berriak erakutsi aurretik lehendik egon daitezkeenak ezabatu
	$("#xehetasunak-jarraibideak").empty();
	
	directionsDisplay.setPanel(document.getElementById("xehetasunak-jarraibideak"));

	calcRoute(latLng, new google.maps.LatLng(
			lat,
			lng)
	);

	// Erabiltzaileak zoom maila aldatzen duenean EHren mugak egokitu (zoom maila txikia -> muga osoa, maila handia -> kostarik gabe)
	google.maps.event.addListener(map, 'zoom_changed', function() {
		bistaratuEH(map);
	});
	
	// Mapa prest dagoenean abiarazten da idle gertaera. Une horretan xehetasunen orriaren edukiaren altuera egokituko dugu jarraibideak erakusten ari bagara.
	google.maps.event.addListener(map, 'idle', function() {
	    // Autobus konpanien esteka botoi bihurtu -> Estilo arraroa gelditzen da eta gurasoaren klikak bahitzen du bere klika. Baina abiapuntu bat izan daiteke.
		//$(".adp-substep div div span a[jscontent='name']").button();
		//$(".adp-substep div div span a[jscontent='name']").buttonMarkup({inline: true, theme: "a"});
		
		// Garraio enpresen zerrenda existitzen bada hustu
		/*if($("#agentzia-zerrenda").length) {
			alert("Garbitu");
			$("#agentzia-zerrenda").empty();
		} else { // ez bada existitzen sortu
			alert("Sortu");
			$("<ul id='agentzia-zerrenda' style='display:block'></ul>").insertAfter('.adp-legal');
		}
		
		$('.adp-agencies div div[jsselect="$agencies"]').each(function() {
			// Autobus konpainiaren datuak eskuratu
			var izena = $(this).find('a[jscontent="name"]').text();
			var weba = $(this).find('a[jscontent="name"]').attr('href');
			var tel = $(this).find('span[jscontent="phone"]').text();
			
			// div-aren edukiak ezkutatu
			$(this).find('a[jscontent="name"]').css("visibility", "hidden"); // izena eta webgunerako esteka
			$(this).find('span[jsdisplay="$this.phone"]').css("visibility", "hidden"); // -
			$(this).find('span[jscontent="phone"]').css("visibility", "hidden"); // telefonoa
			
			// Gure edukiak gehitu
			if (izena != "") {
				alert(izena + " - web: " + weba + " - tel: " + tel);
				alert($("#agentzia-zerrenda").length);
				//$("<div id='agentzia-" + konpainiak[i].name + "'><div>" + konpainiak[i].name + "</div><a id='agentzia-" + konpainiak[i].name + "-web' data-inline='true' data-role='button' data-theme='a' target='_blank' href='" + konpainiak[i].url + "'>" + konpainiak[i].url + "</a><a id='agentzia-" + konpainiak[i].name + "-tel' data-theme='a' data-inline='true' data-role='button' href='tel:" + konpainiak[i].phone + "'>" + konpainiak[i].phone + "</a></div>").insertBefore('.adp-legal').trigger("create");
				//$("<div id='agentzia-" + izena + "'><div>" + izena + "</div><a id='agentzia-" + izena + "-web' data-inline='true' data-role='button' data-theme='a' target='_blank' href='" + weba + "'>" + weba + "</a><a id='agentzia-" + izena + "-tel' data-theme='a' data-inline='true' data-role='button' href='tel:" + tel + "'>" + tel + "</a></div>").insertBefore('.adp-legal').trigger("create");
				$("#agentzia-zerrenda").append("<li data-role='fieldcontain'><div id='agentzia-" + izena + "'><div>" + izena + "</div><a id='agentzia-" + izena + "-web' data-inline='true' data-role='button' data-theme='a' target='_blank' href='" + weba + "'>" + weba + "</a><a id='agentzia-" + izena + "-tel' data-theme='a' data-inline='true' data-role='button' href='tel:" + tel + "'>" + tel + "</a></div></li>").trigger("create");
				alert($("#agentzia-zerrenda li").length);
				alert($("#agentzia-zerrenda").height());
			}
		});*/
		
		// Jarraibideen ikuspegian bagaude edukiaren altuera egokitu behar dugu.
		if ($("#xehetasunak-mapa-jarraibideak").is(':checked')) {
			$("#xehetasunak-mapa-edukia").height($("#xehetasunak-mapa-goiburua").height() + $("#xehetasunak-xehetasunak-mapa-goikoa").height() + $("#xehetasunak-jarraibideak").height() + 8);
		}
		
		// Kargatzen ari dela adierazten duen ikurra ezkutatu
		$.mobile.loading('hide');
	});
	
	/*google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
		alert("d-changed: " + konpainiak.length);
		$('.adp-agencies div div[jsselect="$agencies"]').empty();
		
		if (konpainiak.length > 0 && $('#xehetasunak-mapa-busez').prop("checked") == true) {
			for (var i = 0; i < konpainiak.length; i++) {
				alert(konpainiak[i].name + " - weba: " + konpainiak[i].url + " - telefonoa: " + konpainiak[i].phone);
				$("<div id='agentzia-" + konpainiak[i].name + "'><div>" + konpainiak[i].name + "</div><a id='agentzia-" + konpainiak[i].name + "-web' data-inline='true' data-role='button' data-theme='a' target='_blank' href='" + konpainiak[i].url + "'>" + konpainiak[i].url + "</a><a id='agentzia-" + konpainiak[i].name + "-tel' data-theme='a' data-inline='true' data-role='button' href='tel:" + konpainiak[i].phone + "'>" + konpainiak[i].phone + "</a></div>").insertBefore('.adp-legal').trigger("create");
				//$('.adp-agencies div div[jsselect="$agencies"]').append("<div id='agentzia-" + konpainiak[i].name + "'><div>" + konpainiak[i].name + "</div><a id='agentzia-" + konpainiak[i].name + "-web' data-inline='true' data-role='button' data-theme='a' target='_blank' href='" + konpainiak[i].url + "'>" + konpainiak[i].url + "</a><a id='agentzia-" + konpainiak[i].name + "-tel' data-theme='a' data-inline='true' data-role='button' href='tel:" + konpainiak[i].phone + "'>" + konpainiak[i].phone + "</a></div>").trigger("create");
			};
		}
	});*/
}

// Erabiltzailearen uneko posizioa edo hautatutakoa erakutsi mapan, egin nahi duen proposamenaren kokapena mapan hauta dezan.
function prestatuProposamenaMapa(id) {
	// Kargatzen ari dela adierazten duen ikurra erakutsi
	$.mobile.loading('show');
	
	// Euskal herriaren mugak
	var eh_points = "kd}dGfumCiEnr@{\\nr@cB~\\lHtcAfEvXr@pnBxQ|i@zQiC~Tvg@~IqGz\\j_A~T`{@deBqGhf@hClSsGlShRvYcAlH`{@dn@trAdy@cAp@vXhPzKcBxv@|}@tItNdAdc@aNxd@vI|g@mT`k@sGvYdPdM`]dXeAn^ip@|g@sVzQhRxd@pGl|@`l@wCdPdXvI`JiCpKlc@dMre@aUfn@{FnaA|Q`l@jq@?xYwIn^cAiEduCfXrGn^j_Adv@zZ`Uvg@|\\dAnSzK|QfCaJja@rKrt@xYd_@jPhCs@naAnHhp@rKj_AbB|x@{Ftt@?zi@zFre@|Q?hPrV|F|i@tl@?p|@ka@lf@zKfc@nTnoAePbU~MlH|i@xY|i@uC|gAbBha@hEhR_]flAq@vg@iE|x@rKztA{Fd}@p@|ZkPbwBhEfn@`fAfCtVgCnoAzK|o@bAm[trA?|i@l[~MhXcAjPyv@hc@oaA|Q~MiEvg@rKvX|Q`]`]f}@|QzKdBlTb`@bP?nc@fk@lTxrAcAp^wXvVhRoHlT`JlnAbh@`l@?lT_RlT|FrGeUpV}QtcAgMre@yNpG?fn@bh@lc@jc@rGdwBxcBd`@cApf@d_@tVoc@b{@hCq@wg@xNka@py@mEd`@_NnaA`]hXhRpSlE~Qlc@`]`]tKvv@lc@l}Axa@nc@dh@d_@liAbyAjqAbAzgAvg@pn@zKhfAxg@hEbP`e@wXlP{ZsSkp@|Fwg@|YiRp[wIzN{K`J`NxViRjXlTlPlTnHvIlPdP|YflAhrDnhDtf@hR|YvX`RvX|a@|x@|YsVr[_NrSePlPcPd]lThMlTxV{K~t@xg@js@{Kt_C`jAfUzZv^zKpc@vIzVwIv^mEtSmTzN{ZtSsVd]st@~a@_N~YsG`ZlEtSzKd]qGtSzKhp@lThMiRs@uIbRbAfUcAx^bPjh@dAxf@pVf]{KhMmc@jEiRlcAm}AzNe_@vKiRhx@mE`b@cA~a@e_@b}@}i@nPcAvKoT~Fe_@kMor@wCwv@?oT|FqVkEoc@xCiRvn@vIpP{KpHwIf]{KzViRt[`]nXePzf@|x@t[nr@fe@nc@ps@naA`b@hRh`BppAnsAnaAtk@dPlx@d_@nXfCbb@paAbRa]pPmEjUbAbZhCpH`l@n`@taBjMuIbZtXvc@zKbZhRdRd_@|NvIxCjp@yKrt@wKrVdBzi@eBd_@eB|i@q`@|x@cRjp@~F`jAdBl}Azn@dP~FpVpH|i@jU`l@yCrt@?lTwKxg@kEvv@kMlnA_Gre@qHre@qP~\\sHpUW~MsLvXiMjSeFvXeZdP{f@`]kUdQi]dPcNbOkM~\\qHf`@VdP}FdPmAbPcJb^eFvXeBbOeJ~MkExJ_KrHqDhReB`NdFjSpH|LjMcAp@vJkA~L}JnFyCpGeFxJYrH}N`]?tH~FdBpDdBxGeBjGdB|D`G_AfBKxCjEa@xAfCpDr@~BxCvElEdDa@r@wBjCdAdBlE~DdIe@vBpDfCdBjDlCPY|E_C|D_CwBeBbAeBlEyAlEKjD_AvIdBzD_CrH~B`NpH`O}VtWr@zZXpd@eNrV?xJqHvXkMvv@kItHeBpGwKzKyGhRoX|LwOjS}Rd_@}V`Nsk@zi@wSnT}NzKjAfQqDnUbNd_@vSjp@eBvJ|FfQiQ|i@wSha@kI|ZwCtIvClb@jInUeFvXdFzKr@|i@_GdPwOzKkI`OoT|LqDfQeN~MxCnF~BjDvGeBnTtf@_z@tf@aVxYhMbOXlTeJnF}JnFcR|ZiQtIeBzK_GjDcNgCkE|[jEzw@}N~MqHfQwOnFcRqGwC~McmAqG{VlE{^jb@wKiRyn@`@}JoFkEaOaR?yC{KkIdBcJqG{RmTu[kSqD_MufAglAq@_N}NaOwKcOuSuWeB{KuO{Kyb@gQwGqVqLePix@knAaNeP{VkDkErGkEgB{ZeBs[uHgY}[{Roc@cFyYtn@cvB`^iRnH}x@vOcm@_G_NmTa@iQ{w@kh@_k@|FchBdJm`Aj`@st@tz@or@u[o`AyV}j@oPc^iUse@iIoc@qLe_@mXzh@uK|j@wj@nTs[bPm`@?{m@kb@kh@g{AyVjSeFhR~FbPmA|ZXbPkAfQbNxJyCjSmTfBiQa@eYhRcJqFaVdAuKlT?fQ_GzZiExJ?rVkIbPvKtHcJjSwCxJkEvXpDbPtOzKy}@fuCr[rHnPzKp@nT{JbPuWzKai@re@jApUtO~MbFjb@Yre@aNhRoL~L?dQkAvXeBvXuKdPaVtHuOqFyVsHk`@a@iMfCqDxJr@`N|]|[{J~MaRvXcJnc@{NpGiMvXmTzKwCzKVrG|FlExCfCpDeBpDfCbFiDjEfC|FeBbJtIeBnr@?nc@}JzZiMdPaNtHuKyJgY}ZwZoUca@{KyVxJsWsG}a@fQkAvIvG~j@iItf@wKlq@gM|LwGvX_V`{@eYdn@mPse@{N}LgQ?aNbOiI~\\jA`NqDtIgUvIiEwI{NuI}]eA{JrVp@re@hEjDjEcAvGfCtGeBnLhRoHbP{NvIw^jSyRbO{JjDeB`Op@rVqD|j@~BfQnHjS?tWiIbOyRpGmTyYuGdBkX~[gQwIsO`N_C~M`NxJzJbPiEdP{JhC}JmEmPtW}Ff`@sKlTiIhC}JzZvGfQtKnU?`NuK|LsSrHmPvIq@dPvCzi@lPbOtKjSjAxY`JhRxC`]nDnUjAzKvGjDbFeBvGtIh\\lb@`Ntu@fQ~[lPrWiI|i@qDf`@aJ`l@aR`@wm@dAc]g`@{NqUyVyJqSb^}FlT{NvXqSsH}F?aR}La]nr@YzKaa@bkAgMeBaRre@aJdB_VkS}F{KeQgC{NoTg`@_NoHlTaNnTbFhRoDzi@_CtWnHxJiEfQqDtIwCrVbFzK?zKjX~j@Y|L{JfBY~MnHtW|YjDfQ|LnHha@Xtf@jAb^aNhRyRlE_V|LoHfQr@nc@cF|[|BhRxRhRhEbm@cFpd@wVkSp@qG_NdB{NpUuGtf@jAhp@}Fre@kTlb@a]kSiIiCwCmE_V~MwCtW{YvdAiI|[uKb^?vIvVdPnH~MkAjS{F`O{NrGg\\`@{NvIuGvXeQ`OqSlEqWlEeB`]cBbPpSxJlLuI~QcObFpGnHfQuGvXgMtWcFrVbBtWiE|[wR~[aNnUiEjSfMtWnHlTtVcPrS_M`]jDvC|i@bFpd@oH`OgMeBqSpG_RzKmLkDcJtHwChRiE|L~QxJlL~MdBfQqDvX_NjS{Na@_NzKwCrVjAdn@qDd_@sKd_@VlTbFxJiz@fo@sStWe`@dP`JrVwC|[q@h|A}UnTsOvg@}Flb@~QnpApDnT|BrHdd@`]qDzZcBvg@_Cfn@oDnd@s@nc@cBf`@uG~[_VxJqSeA}UqVWwIgMqUyNeBwVyJq@wIyRdAyNtImL~[`J|L|YpGva@rVfQrV`Yre@jTre@rKxJrb@iClLyYhEcOzJkD~BnT_CvsAr@bPYd_@kPh`@mP|LkPfQiIjSjAtWzYnU`]jDvG|L_Cj_AbFzKzJpGxRaOfM}LpO~MjAtWaFxYgQdP_RvJoWeBwVcOsOcPXiRoHqGuG?yNbPwVf`@_NjScJdAwCrHn[fQvRzKjAzh@dBtIeBtf@cBrVvVzKtGiCpf@|x@bBfQjEdPcFfQaNtIcUhCyRnFyNzKm_@jDkPzK}FlToDzKiX|ZnDzi@q@tWmLjDuZcAoWmE{]wIgIzKrKtWbYxYvCd_@nDrV`J|[X|i@ytBcjA{h@}LojBc^s`AjDwnAwIuVgCwt@mSr@lSiIhRdBdQeBrG_NnaAyN~j@{d@l`Awa@ha@yJfQ_RpGaFd_@sKtHoHjScFps@hEbO`JrHzJjS}FvXwNhRri@nTzbArt@fz@mTfXtI`YfQvGbOlWuHdQbOpDrt@`Y~y@vp@vIzJfQwR`OVhRuG~MoDdP|BpGva@bOzJoFrZc@lLdPdBxYcFxJuVbAm[`NcFbPeQfQ_NtWeQ`@sZjDcU|LuG{KsOst@_Nqd@kP{Zm[wIiTiCqOpUwCjSkPgQsZsHuVmE{JnFjPzw@|Qre@jAre@eMbAuVdPgIhRyNmEkPwIoS}LyNkDyNjDgXxh@{Uzh@{FjSYrVjA|[uG~[eM~MgIlTmLja@mLd_@}Q~McQha@gXa@{UvIkPdBkPrGcBgQcFmEgItIwNtHgI_NyN?}QoTuCbOaJpVoDlS_Nc@}k@oU}Bnc@oH~\\yJxg@yJjSgI~MvCvXtCtWqOkD}M}LqOjDkPrWhEnTdBzZiEpd@VxJq@bP}BlShEzi@Vja@{Ftf@tV~MlWtWaU|[kPhRin@rGgTzKuGvXoDd_@kAtf@kLjS{UrHcFsWiPmE{FnFnDvg@sKhR}\\mE_J|LpZl}A}B~MsK~j@qZlEk[`]eg@zKsVuH_J{KgTbAaJ`NxJvg@fTlq@aFd_@sKhRaFlTqOdP?~Mb`@dAt]lTgIhRcQtIgTlEiEd_@sGre@nOrV?jSpOrVpOzZhAfn@bFnd@oD|ZlHtf@jA`l@ij@io@}FmT_o@sViPcAc`@gQsVuI}MmSsKoFgEoF|Brt@}\\bm@eMhR}Mb^wN|ZcBbP}BtHwNjS}r@i~@aUmE_JzK_YeP}M?gIqGqKiCwNoUg_@bA?iRiE{K?sWcXyJwYjDeXoTtCe_@uh@yJwJa^aUcOcX?wd@ia@}r@gQiLdn@}XmEgTdP{Qjb@hEd_@t_BnoAh[?tNha@hf@xYbQnT|BrW|MrVkAtWp@xv@sl@jq@uNlScQzi@zwA`{@|BvIbQnc@fj@`O|c@hmAfdAgjBhEdkA}Mnd@u]pd@_JrV{Fa@iEfQy`@vg@ubAlq@cMd_@cQrW_{AtoBcMnUus@lb@}MoaAezAhD_aAitDoOfBkLuHqVhCeIqGa}@kp@cBmTueAdBeB}LmZkp@?_]rGyYvJxC~@kD_AwB~@wBkAkD~GaGvAsHiC_FoMmE?eIe@wIvJwQ~@_FiCeB_A{DuCs@XaGqB_FbB_Gp@cH|DuH?{KtCmE}@wQb@ae@l^}nAp@mS~Ig`@bD{Zp@sVxHia@l^`GbMvBjWxJpa@tIzFiKp@ePtEmE`DmEhEwQq@yQVki@cBeBvLa@~TcH~KmL`FgCxF_MyHkx@W{p@qXqU`HgJ`D{DxJyQzDeBvY{R|B|Dp@qF_AwBiAqbAp@oFYce@uCuPwCoFmHuHWoFfE}L~@uWtCgQuC}T_Ju|@e@gXiEuWaFg~@uC_F|@{D?aGyHse@yHyCkAkKeT~Eo\\eW{DiKql@oc@aFcPvJc^ss@ef@W_]wC{K{ZsVe@nFoD`GmFuAkAbAgGbHoB?YjD}B|LiNjSgEtAcBhCuEtAkJfJwCjKWhKs@nFq@zKXjKtEdQq@zKe@~E|@rHiCnMYfQ{B~EkArH_JpGsIhCwA{DsEwB_JhDwC|Sr@fBe@rH}Ba@mH~M_HlE_AhJuCxCp@zDKdIcDvBuExQoDfCwAhRsGzCcBzDmHfB{BnFwL}ZcDsAmFqFeKa@oOuIiArA_AvP{DrOgPxJ_AhD{BcAiPpNsG|LK`GeKhCyFdIcD|LgE`GY`H_HjK_HdBoDyCqKhCcB}DaHn\\d@bHiCvP{DbP{DvIiCxCmH`NlQzDtE`G|Tj_AcVjdB?pxA_JtPbBpwAnFxo@wArHwCxQgYzp@eItP?dPeBnFmFvIoBhKgPlTiCbHyJzKkH|LcDwBaFP?{KkJuPkJ|LuCQuC_Ub@gYbDa]e@yJ?aOpByQJ{SuCaVb@cViUcAiNp]kHq@uPkK}@uIcDxC_SuAmOtAyHQiCxCoBq@cD`@oBwB?}SeIPeIhDgGpFyHs@uE}DyZyRmFbA{VjK}MNd@tHkAdItEfQaFbHoBzSwLzKe@|LmDtA}B|D{DdBwJsHgGcOwJiKwJyQ}IuIoDjD{MsGiE{KaMiReIqGmZ{ZqKuHeP`NqK`@gt@~\\zMja@h^pVsGbO_QxY{MvX?xh@gEbOwJjS_JbO}IjSuC`O{FrGwJ?aq@c{@uaBopA{B|LuNvXwn@oc@wJaOiAwIcB{KiL}L?uHsGuIyF}ZrGmE?sHiEePmVhC}TxJyXvXeIpGyFhRaF`@cBzKqGlT|Ih`@sGd_@xF|Lq@lTvJzKnDpUh^~\\lDrG{BhRYzZcB~MaFzZmO|ZgLnF_JrHuCvIjSjStJ|LkOrGfEhRhLjSp@xJaXvXjAxJcMhDq@`NoKjDgEtIkH?sGtHaFgB_Xxg@mHpG}P~MmObOaF~M{BlEtU`O{Flb@nDlEtCzZjAxYuCfQYxYjZqG|IbO?nUhLhRhLvXhLpd@`M|LjH~MhLf`@nVbOfErHbBzKbB~j@dItHxXnpAcMtWnD|L|ItHjShRrYvIlVnUbBbOzF|[cBb^fE`OtCtWtUlb@z_@trAfEhD|B`NkAhRnDxYnKnc@lH|[|ItW?fQnDzK}TfCePjDoVa@{MxJ}f@fC_QfQqRtHwJnFiLnFsNbAuCxJ_JjDcTfBcIfCsY?oKvI{MiCgPjDgp@hCcx@sGov@a@qRrVaMvIwJ?qGvJsYtWcI?qRtH{MbAoRfQsNa@gEsGjHia@hA}LuCePvQiRyFqVW{KuUoc@p@_N?{KgEa]qR_N_FdBiLfB}PoTkA{KgEsH?gQcByYwQkSbB{K_F{KkSnFePrHcB_NgEkDwXkDyFmToKsHiSyJkAcOp@yJ{BuIoD}L_F{KsG{YtCcPnDwIbB}LY_NcImb@uCmTwJqs@_FoFzB{KuJpGuJgB{MvIaMjD__@rHkHgCaMjDiA{KsNyJYmEmDiRcT{KXoFhZ{KtC_MfEiR~WmEhAmEyFyYiHkSePqGfE}LkHsVp@uHoK}j@q@c^nRmTvJlEpGpGhSyYbBkp@gEmEhAqGqGyJoDal@gEuHaT{K`Ma^oKc^gLsVmOeB}W{h@aMm`AzB}LePuf@xXsG`m@dA|IoFdWoc@x_@bAhSuu@_j@}ZgLmc@qG?kZuf@{Byg@zB_NqGkSbBuf@aFsG`F_NaFeB{BuWp@yYcBaNp@{KkH}LwQ{KgEsHymAwIq`@zK}iB`OkVkSwQmE_XjS_F?KOnByCpAeAv@oBp@q@e@aCj@}A?uEd@sDGcDj@kAXwEj@sHMkDuAqCDqCVoFuBcH_@cDRoF?kDPsD_@mELaDMqCc@aCEsHaEkDaDwBEmAlCiDvAcDjA{DM{CzCkA~@Y\\s@^cA|@Gd@k@`CmEnBiCtCmBjHiCPoBsCaKiDqNiBkLgCaGcCoBkGlAgDtAk@Ne@O_@N]Y_@Pq@s@{BeBsENqH|AeGmBmE}DgMyCgEiGgMqU}@yC|IaGnBeIWgJcBgJp@eIvH}ZjF}L|BsOdEiKnKcOfL_UhCqV`DaGjO{a@bRiK|Ys{@iSiRlVio@mf@kb@hSyo@jO|Ep@sHpGQvh@kSvJ`@p@gCrEvBxDkDfEnFX~EjHeIe@kD`D_UhC_F_AgCwF{KxMcOoBaGaTuPwQkLqWkKwQzZqPmEiJiDgLc@uChCsEfJb@zC_MjS{DtAeG~FiJiD_OkDyDfCiJnTmF`GgEdIgClEuCbHgE~FeGfJ}BbHc@vBaDdA}PtP{KvB{D{D_FoFcBgIsEiD?uAcB`@k@mAwAz@KkDcAmBoBmAp@qCDkH}@aGb@mTj@}HuCgFuC}LoI}ScBkDoBr@q@{DlDc^mDcOsLsOgEyC}@mEoBeBJoFgFaNmEsKcGsOqB}AcA`@oAq@k@s@\\oBj@YQyCwA{@iBz@aCwBwBmAc@kAuCtA}AuAWmADyCp@aCPyCaDiKaE~BeF`@aEcA}@mEuB_FEmEmEaDe@wBoBwBe@uHaKaV_HaGeNcH_MiDeGhDJiDcIqFKqGwAwB|@{DiA_FwAwBoBbAiAeBJsGbBwJcBgBwAr@cBaGXiCzBq@nBs@|BxCzBkDhAwJ|B_MnB_GJmEcA}DqAj@K_Bj@mBq@a@w@p@k@a@d@s@VY|BXzBYlEwF_FeB_@mHkGaK_FuAkH}AcQ|DuBrDaCjHnBjDbAlEv@zHE|DJjAQfBqAs@w@oB_EmI}Br@gCdBq@nF|@dAcA|A_As@iA}Ew@Xw@c@cAX?`@nAdEPbA|AlHk@bAi@Pw@{@iDwEuBoBQaDyFz@sDtAgFX{AuAkA{@}@yCyEs@cAeEVsDJkDK{@RqCVs@K}A}AkAw@Ve@{@KsAaE_BoA`@_FH}@a@eA`@{Az@wB`DcBwB]oBxDqVv@yNLyQh@aGWcE}AwEdAuEiBkHwBaGmCyCEkHk@sDVeA]uAViDQyBcC{Dc@aG\\wFWgBaDmBkAqCKqCj@aCnAwB?uAaBuAGeB^gBrDiDRkDtAsDQgFyD_F_AX]s@qA`@DkAhBuEj@{CEuAhCuEPwBq@uAW}Aw@cAPgBvAmA|@eBtAgBd@kAnBz@|AlErEFpFoBhB{DbCmEPkDp@oF_GcAmCoBiCcHtC}D|AmBGa@p@mAjAQtAa@iBmIuAk@cBz@iBlAoB_Ce@sGoAcEJuAwA_F^oF\\uAWcDcB_Cv@mApAaHEuD{DgJDkDjAeBhAiC?sD^wBDsDcBsDtBz@d@}Aw@eAb@oJEqNv@oBbBeBfDdB|@FXj@bBYv@Y`CgFDkAvAuA^oBnAaCp@eFk@oBX}DbAwBwAkDEwFcAgFj@wFK{KD_JrCmLF_J_AyGeGmHqEmEYqCd@uEj@wBzAsDR{DqAmAw@wBiAyFj@iDzBwEP}HbA}Ix@_FGsDRk@e@{@?}AwAcAj@}AKyBw@a@Jq@bAeARwBVoFq@aKmDsDoCaCiAa@q@Pk@k@Dq@}@wB?cDd@{@nBmAK{@d@gC|@_BnAqCj@}EuBuEE_FeAXRmAtA{@d@}AD{@bBmE?qC}@}APwBp@s@iAyCJgBpAkAzAFjAz@zAs@dAgC|@mEDkGw@qKcC{KmDuL_EeIyEeAuDwBEkAqG}AqAcD}FiGiBlAgDoBe@qCcBsDWqCk@NeAa@LqCgD}A}AmEb@uA}@cH{AaDoDgBuAeE}@mIoCmE_GbAoCbD~@hC?p@k@r@kAi@}@k@EcA{BuAE}Aq@wB|@{CbAj@nBk@pAlAtAlAvAI|AsAhAyB|@wB^cHPgCdAsDYgF}AwBEuHcBmEoAuAuBgFmEq@e@aCR{@b@a@K}AuCgBoAeIe@kH}@mA|@wBv@uAJyCw@uImCqQiB}EqHiGoCcHgDuEgEgBaDkHeFyCmCwBk@mEV_BzCeBlDyFpG_JxEaDp@cA|AFlDbA|AG|@cAv@VnBzChCp@dFkAvAbA~E`@|G{@fEqCnBiD~L{GxFqCrE}AfD{@bJFpFyCtD_FrCiGfEwBpImAxD{DxEmLhAa@vBeIVqG|AqCbAiKvA_BJwB}@{DJwB|@iCw@wBoBePd@_C|AY|@_Ck@{@wA{@DeEpBk@M_CXa@bBxCzCxCtAO^{@PmEpH|APiCdGqCj@Pe@`D|B|D|@iC`Ci@jA`@SfF?vFj@dEnC_Fp@aOSoFoAk@cAy]oCwBEoBnAsDvAiGw@sDbBaC?cAj@k@Y{@v@uA^XnBcHe@eBPoBzCO^mE|AiCtAkDi@kD|@qCfC|Dv@k@pAr@lEs@zBkDbB{@zDuA\\}EuAcDGmBvBQ`Da@~DXq@rD|A`@pAuAVmAv@wBtBq@vAtAhCIbBX|@lE_@zGpAnBxDcHdAuDv@oFlC{@`DoBnDaDlDk@j@a@nC`ChBa@tB_BnAYj@bDfDi@bCk@pFa@|AXhBvBzDuAb@gF|AwIhB{@bKdAlCqC|B}DfD{@JqCtCgFnBi@|IvB~E}AzJGjIh@`D~[vHdBpGuAhIeIfEwBfEs@zRG|HwBd@}H}AcHzDiCbAyCuCwMp@wBj@{@nBnBnBzDpAvBv@bDfEwB|@z@tDmAtBoFtAaDrGiNnIFjAOfC?~O}OJ}HcAiKwBwBi@wBq@mE{D_Fd@`GbAzDjAfFlCzK]vEcBdBmE{DeGeAeHlA{D_CsEmEyDjAuCjDgDtHsE{@uCqCqAq`@{RlAq_@hRwGFwHtEsGfFsDhGcC|AsEj@aCrD_Fz@oDtEyD`CmLhGqAkDcJQkG`C_GdBmEcAaCsDw@}DyEHErD{EhKuBhCkHpCo@a@oClBgF{@{AcAyMQaEsAwAqCkEuAgFwIgD}AcAqCmEuAoCyC_GmAw@_C}@_Bp@eF?_BqAi@FmA\\aDq@}D^iDJkDw@iJbA{Hk@k@?eBbCiCPaDXqCp@k@zA{DbDaCnAqChAoFFsHSuL}@kHoByFaEuAoHXLGfIiLyBcGsLaIiFc@yDiG\\}EqBeECwBnBkFoBuAp@mCdGqGnAqEReC~IiVtEwBhQY`Fa@hEJ|@gAtDpNjFnArBDrDqFKmIp@aDtFcFlFqJzEe@`EeC|IgJpCoBxBcGhA}H?_Lf@gBGmCTsBvCmBj@kBtBiCtCeGIw@h@mBl@oBcBaCTyAbAkAUsByB_AS_DV_AUkBa@Pg@kBv@{BOeBNoDS{@FyFaAqAk@cNm@mCi@XWuEgDgFo@mEOcDh@{@`D\\zCiBnBcFViCfAaBlEmCbAeBFgDgBaEz@e@}AeK|@}AxCwB`@eAhAw@pCi@lCyAhAgBt@qCZeDy@mJoBaG_C]Se@SgA`EmLbA_AzCtChB]~BfA`DhCnBCzC]jEQ@aBiJ{ByAd@iCkFkB]kCiEe@oDH_A[}CVcD}C{Dw@}Bc@TkCwDa@cFaAkAg@wEWiB{AqA]uA?kF|@sFaAoD|@qC_CwGBoSf@eCzLqTr@i@zKVpDm@rIwIjFeRn@G`AFfD}A`A|A~Ar@`CYlB}Cf@qCt@o@xAr@|AY~AtAnBTdEs@RwDh@k@jCuGr@mEj@gJAwCzCuNLiI}@gFqDiKcDwDgAsBI{@To@AoBsCgJqCsBP_A~BgBZcEk@cB{AeB\\wDhCwChAqC?_EcA_A_C{EKmGl@cApA?TgBk@eB~AwBa@eCl@kQ_AwQ{@cHmAkFeBe@UgDkAkBfAmEKyCmAo@e@eBdDqCjC?rBo@~@}ASgDzBqBxBs@zOmLjCeBxBo@~FPh@yAxCuATkDT}Ac@oIlC}C?_Al@|AlDpAZxIvF`ErI{R@q@bBoB`HpAn@w@sC_A{AkByBa@wEl@e@sBlCaOnB{IC{BcE}FuD]]eBNwBhAyAlBaGjB}AlBU`KoFpAkB`C}AdA?l@UhCKxB}ATkBbAcAp@UdFcJ]cFZoDq@aB?w@bAaBdNsGdAuC|AsBnEqAn@q@LePvB}CrOcFhCqEzC_ArAcDbGaBx@wBzEeCdCmAnBaD`P}H`@v@t@yAa@sBVqA`@F^WY_B|AiBt@?xAxAj@e@OsBpC{@n@{@S}@|A{@Rf@r@]N_DiAeBCuC_@oDaDs@k@mEZe@b@cDp@]L_C]wBvCyD|@wFjAgJnB_H|DwGEcE^Qf@L`@wBkBJr@yAEiAVcAKcAg@\\I_Ap@_BlBaByA`@FcA|@w@NmAfAi@OcDy@b@EmAh@]Ea@y@z@Ik@Di@`@o@m@eBiBh@yAuAe@kD\\yEs@kH~AqEn@qL~@cAc@aATsAf@?Kg@Fm@b@k@h@_CAs@g@gA\\]nBeEdAqCCs@`EiKk@iATGl@F[eBtCyHv@gAWk@lBqAn@_CjAeCJn@w@rDp@Cd@yA|@yAhAe@NUAqAPm@|Ac@`AkFVHm@pEx@sBtAwBdBeClAqAwAoHRs@FLjBpGoAxFaHdMzHrKzGp@lAcEtBmEb@NzAgCeB]bBwG\\_JpA}Ej@uAdBaNc@u@fA_DiDkH_F]u@r@?bAUrBcEpAEuAlAqAl@Xt@cDU]uClCOUhCeDtC_AP{Am@oCv@iAqDUE]`EKZeCq@a@f@{@bAyE?eCfBqN_@e@RmEv@sFrAyAhAqCvAiGd@iAIaBPo@x@kFrAqAjFgNT{BvBgDbAYbAgB`@cCd@_AhCgDTuAbAgDd@mBPsBhBcHh@qCbAiA~Aq@d@mA|@o@t@cC|@uA`@aBt@FtBa@tBh@pAhAKbA|@`@Te@vDnBj@fChBlCtBpAn@Ul@XhBqAoGaQWiATyC_@uAdAmAk@_Cu@i@?k@^a@Ok@iAeB~@iEd@GQeATgAP}AoFcFF_C]g@N{@{@uEf@?L{@Si@n@Eh@L^GnBdB`ATn@o@tAwDd@qC~AqAvBwF\\sBdAmCPkDDgDs@qBq@g@p@gCZaCf@gAl@_Dp@}AhDgLPoDDiCTGj@o@j@]xAz@`Ad@jDXlDyAdAmCPeB?a@zLpAdGVdHj@xA\\bC|AhAn@lA?hBR`AsFqAcAiFMKXeCOaTcBUw@j@m@hAeGHsFOoDk@oByAr@eAeABmCIaHKaCaAmCk@iBuBaCUcA{CgAuDw@a@{@[d@e@e@Ep@yB}Ad@m@Iw@j@a@KaCH_A~AaE`@wBMwBi@}A^qA|@m@jAg@bByEe@eEbBiGOgA`A}Bp@kCFoDjDqJxBiIp@o@OK|FiLd@gEOw@Tk@NkA`@cB|@{Ig@aHw@cFsBwBoBtAu@k@HgAZqAl@]`@o@h@?`@Y`AOS]zAa@YuAjAcDOoB[i@_CQ{@{BHuAv@{@j@oBl@gABgFYsDaA{D}@mC{DBKe@v@cBpA}A@{@R_AJyCu@mCKmA`@cCtAkB|C{GH_Ck@yCjAsDh@iAt@oJ`@wGNmLVkAtAyC@aCUuCJeBh@aCIyCKwBd@}HG_HGgCbAkFUuABw@OcDCyAq@eBZ}Dm@uNq@}G}AeGUiAkD{Kw@sDoAuCcBmLw@mBuAo@q@yAEkBy@mBw@lBf@iKsBzBg@w@_AxAW_ATsBT{@j@}A[o@hBgLKyAnAuJiAyCEk@yFiD_AnAWi@r@iCa@gA}CNoDhCq@e@HgBd@mCYyA_BmBPgDvA{Ir@eBUgBj@oB?w@RiBhAoBAmAe@kCFsBn@}BT]zKhR|AtCjCxD|B`Br@n@rBRpAlAvBbDF\\nA`BlBtC|@r@t@IL_AwCsByAsDlEsDdB}Ev@eGuCwEmAn@g@`B~AlCkG|Hw@cA}@t@e@i@lF}HwJwM~D{FeAyAgDo@eCpAiB`I{@l@_CGdGlKQ|@eOmW@a@p@FhBeKk@qAQqAqAmB_Ad@mFiIgAl@UYTTKo@Zm@CyAUiAe@iEh@mBEiAgBeIcBsBsBs@iDXwBxAk@]eCj@oCeC?gAsAaGEoBT_CsB}LQyDoBaHu@o@E_Ck@cFm@oB{@mAe@kAR}DIu@|@{GT{Be@mCKaBTaCX?Fv@XB@m@X{C~A}AToDv@oD^cH@}E^k@NaBEgBk@_AZkAZUd@ClDyA`BoBZkBDyASuAWyAd@{@G]`BgAnAcDdAeB?yDg@e@Fe@d@YVyA\\g@hEgADw@^]nC_A\\uCU_DiA_CcCFkLaK_FbBoFg@qAqAoC\\O]~@u@@]_CeAeBn@uAo@p@i@]]T]I_BJm@Aw@xAyAbCuAp@e@@w@e@_AN]v@BNnB`@Jb@iAb@]`LrEtG{Th@GTt@pHxFU~@kIoFoEdTMhC?`BZJj@aB~GdGhAs@qBiEv@w@zClE`Az@hA^|BUbDw@b@?rEeEVs@hFsHbBqJXmEqAkHq@mGR]\\XxBoFJyAbHd@|CJzCkA`BqCfHs@rE}Cd@sBsBoFa@yB`AK[yEmB_FaEaEgA{B?e@p@FhBoDp@i@b@UDo@lA_CPcAjAeAxADZ]a@gBf@_CxA{@RaAhAq@dANrACp@BY]lASfAc@`Aj@~CB`@UpAmGDiC?aIMuGi@eMOkK[mE{A_Jy@cJ[qEgBuJOiBHiCmEe]sAaIuCmCwBz@sAgAK}AqA}AiAmAo@{BHmAf@wBA{@Js@}As@g@yAq@e@sAdC_@Yk@tAuAh@c@uAbCeBhBiCp@FrF}GIuAhBgD?mAdA_A`@eG[_Au@`@mAsDs@cAIo@`AyCTe@p@uCC}@v@kCRqE|AqJr@gFAqA`CuGt@k@tAeBtABv@Qp@q@nAX`EqCf@_B~@sAp@_@Vi@^Tj@U\\P`B{@P{@d@aAv@OJvD^\\hEPpA{@|@VZhABxAp@T`AsM_MgHiIBsBtAsJjHkCpCwErFe@a@hHmIrDyCcAgDq@mCw@mA_A`AkBg@I{@B_AcB{B_@NoC_EOyAqBg@G_Ag@z@aA_AWm@w@l@}AkFr@oBLuE[aBsCo@}@uA_Cs@iBmB`@mAq@kBXS_@]N_B?wBgAcCeAw@^a@{BkHyBYi@yA{AmAq@}AeAuAk@`@cBgDLcAOmANiBTiAi@mC_ByAkC_AwBgHRs@v@uKb@w@c@gB}AsBiBa@[s@yByAw@}ASsBZsDQ{BcAeC{@sFN_Au@wGd@w@cAwBe@oDOiD_BmCq@d@a@oBVi@Kw@K`@Us@`@cAgBcAoAcHr@gDaCoMOqCaBwDm@yCUaCiA}GPk@_@s@k@uC\\wBc@yCLo@u@}CXs@c@a@Rs@PTp@cCQs@p@w@`@mEg@k@?sArAaAZ{DEo@Ti@Js@eCiGqDaDoCg@o@yA}DTq@mABq@o@sE?iBGiAVi@]eCGcCqBqAMmAy@cC\\{GdAkAf@wBjAqAc@iAKcAiCaGy@r@e@qADaBTe@[iCg@_AVo@KuAv@i@PoBa@s@?mE[w@JyAw@uCGcCTuAi@iJk@yCaCiK{@qAAiCeA{BBkA{@qAeC_AW{AgAj@qAmAoC?w@wFTMNiBk@kH`@gBa@i@`AqAj@kHY{CwAu@t@kBe@o@yBj@MeAeDsBeAyETs@_BeDZeAKyCo@aBi@h@]wBQPoAuFaAyC@mCh@i@TcBl@DCoDj@yAEuAk@g@Lm@oAeABuAf@q@Mw@ZCOeAl@e@QgAIqAw@o@Ws@cB_AMgAi@r@y@_Di@n@YyAf@w@U{BrBEBgAp@eC?eBu@qAQn@o@mA^OJaG`@uAA_DZwBr@uANqB`@ILr@ZUe@sBk@yAXw@_@cAPcAoBiAKqAw@aB_DtAa@~@s@{@oAtA]_A`@uAm@iEEmCk@eDk@o@CaBn@qE\\iAp@e@xCaE|@]`@{@K]v@]Hd@f@SImATs@d@]~IcA~BXfF~@|As@CyCbBmIrByJdCcJl@mAa@iClApA`BcC?aCZq@Mw@b@g@ZiDUw@PuCe@iHmAeIgE{O_GcJwB_CiDqCmD]sBh@eBhEyClC{@`DcBtLb@`@eAbJa@rB}@rBu@\\A`@_@\\?gAuBxA[\\Yr@uAs@o@uCkCcDaEgA?{@}@qAk@mGe@a@a@iEj@o@N{@`@XTUpCcNc@]tBeIIe@bBkG|@cApAaBpAo@|DcCkAqEuFpCcA}@LoCBiL{@aGkG}LHe@VGTRTGIaB{EaIeCjA_@r@}DF_@a@oG]c@hA@{@oEyAIw@kArBXcBgF|AgChCiBlAiBQGz@a@LRoB_@XBF?w@l@cCpCkFNF^w@Yi@bBsIT?Hi@aAmA?s@sBUGj@_@s@{@d@GqBF_BeBr@e@}AReCeAcA^cA?k@Zs@g@q@hAoDa@]q@`B[i@?s@o@XLw@q@h@v@uCU]o@z@q@qAm@hAq@`@e@_A]`@u@cABw@l@yAN{@|HqU]]FoBrCqGgBm@hBmHsBTvBaKZKFbAvAcDp@iIHnB\\o@b@HPw@TINlAp@r@?_Al@c@d@XhAzBhBPrAmAz@uEbAiG_AaIa@iEkAq@s@l@gAoB{@q@}@~BYkBa@pAm@\\u@oBw@uKKg@e@~@AeBe@k@YyEg@h@Wa@u@eKp@~BNcEv@uA_@gHXcFi@sFMk@[~@e@wBQLPcB[i@Ti@FeEj@e@DiCpAfAjD\\z@v@l@SCmCpDg@z@kFtBuAKoDf@{BGaFq@o@?qAxAeBpA]lEl@dAHpAeCj@?Nw@f@}At@}CrA{AfCGzAm@dBcDv@qAjDf@xArDt@jLrJ|DlA`Iq@|[tCe@lAe]w@aRoEqCHsDzDeBlMwc@e@k@nD{K[mVkMeKiAiEdA{@cE_LD}BZe@fAF|AvBtBfDhBtA~C`@DyAyBa@uBaBgDsGFe@c@oB{EuC}DzGxAtj@t@rB?`@YTX`@v@LjAaA?m@VYDw@tBYH~@fDGNtEgAj@Br@w@h@DlAr@EcBdEg@a@aMzVg@o@_H|O_BxAeD]qClCcApCgArAqAm@eDrB_AnDoCxAcBo@sAtAq@e@q@~@aAw@wAlAgAeEs@i@_@h@LtA[n@c@zFeGnK{BNO~EIkFm@yCYcOX}AK]MyAXg@w@yTS}A[qFq@oAw@k@NGk@{BgAgFqDgJg@h@HqEf@e@AyBkAcA]r@uAeCL{@cCiB}DmUd@_Ae@uAPe@cAuA?o@U{@PCWoBPe@g@yCYxAa@sDc@d@eEmRiApAoCmLZ]_@e@T{@GiAsA{BcCoBUoFd@cAS_AmAt@mCiICuA}IgSGcCe@ToByF?i@kAaEk@Pa@iCv@aEcAwDiArBuAuCeBmAiB}CN~@[\\qA_CJo@w@`@kB}CFs@i@`@qAuANa@eAj@]uAoNiGKo@u@`@BkAgAl@wAiB}Dw@eDeABm@a@d@gI}Ci@\\Ko@^m@mMeCIi@ZYRwB{AuFFe@c@a@[yA{BuAcFFUe@eNgBC_AmAw@]xA_Ca@~@sHUsB_Ao@u@qCeCPoAcHmAh@aBgA?sDoB]e@{@rAYNkBkBi@Sa@rAYw@{@lBXCaAj@a@Km@t@E`CqCf@XtCgAuBaCoC]?u@mDUPo@kBKeCiAUr@wBKWw@d@o@y@gA_Ah@CmAd@GIcAs@o@oBOCw@f@]}@w@}@uAj@FhAe@oBk@|Au@r@wC_Au@\\yAp@s@j@CZc@aD{DQmCYxAsBw@^a@mByAyDoBCkAuA}A]{@n@IU_Aq@d@_CsBg@{BeD}Ae@_AhFpArCgBf@Pk@}DJ_AMcAl@a@Zd@V_Dj@]hDCrAkD{Ab@s@aA}@f@JuCyBk@ZeE_CiDeBwIElAiBs@r@zDuB_ATaBwE}Dd@xAVjBsEcFp@OE}A_B}Dw@n@IeCoByAPeB|BfAq@cAEmC}EkFp@k@sAmEgA{@?pAq@_ANo@q@yCTUwAiD`@?JgBj@T`@yAoB{BHeC@kBm@uAXaBmCqCmA}ANo@bAv@cA_C`AUhAm@a@qAt@FD{ByBkB{@j@_CoFXg@rB~@MkAd@IXcAsBi@UqAvAMx@j@QkBf@Gd@s@ZBHa@jCbBr@UyAiAw@sBsAj@D}Ae@a@K|AwAqAoA}C?oB[yAaBeAw@wDAaB|@NHYeAoCd@_@QsFwAn@k@iAuB]g@uCZyC\\{@k@{BLiAkA{DNyAOkB[s@d@uAIq@^s@a@wB@{@QqAfAgAIqCNsBTY_C}A{@_BROhAbACeBd@MJ{DuAs@mBQg@cCcAqA[r@e@oBgAr@aAgB}@yCaEqIaBeEO{EmAf@k@qA`@]Oi@w@o@AwBq@gDw@gAh@_B]kCr@l@MqCVKOkB`AF_@wBlA\\h@i@?wBu@}FzkAm@pP}LnKpGhIjA~EHzDyJhAkHyDyd@cBoT?oFk@kAD{C_Nk_AsDeM_AuE]_FiCkDe@_CvAgBE_CiBoBuBOiDlBiA~AcBc@q@wB}@j@w@jAe@cAnByC]}Av@k@v@`@\\{@i@eBiBs@cBtAkA~B{CXuAkAwAFQmAh@uA]cAoBcDiBcA_@}AXgBMcA^Yj@Pp@Y?uAj@cA?eA`B{@p@j@zEbA`BbA|AmBv@qCdAiC?uE_@eAq@gCPuAnDmAp@sDKmA?cAxDeEJwBoAPk@{@d@sD_@oF{BeA_@kDw@eBwA}AXaKVqCWwBv@cDPcA{Jk@e@_C}@NEkAJ{@W{@Ya@|@kDj@Nj@uA^wBqAuAuCq@oAeAwA_CwGoXe@yNaC{Gy@{DuAeEw@GMwB^cAv@`@JgFq@G]k@w@a@oBwFDaGhAwBuBkDiBcAaEkG?sDoBuAQwBq@H}AaG|@k@?}Ev@h@DkAyDgBkAiGLs@w@{@eA?}@aDj@sD\\{@?oF{B_F?qCcAa@SqC{AGuDeEuAqC?cLqBsGXsDq@}EiAiG_AuA?wB]{CVoFuBeBEwBq@eAVcA?mEbBsDWuHqA}E^eAQ}A?{@v@a@nAtLjAhG`BnBjAh@|AcArEzOlEsD_@s@d@q@|@rAd@W|GxGtD|DDuA{DeE}@gBQgCb@}AdAtArEeErDsK^mE?aDh@gBWwBJiGj@gBEwFwAoBw@cEnCeEDyC}AwEJuA~@b@|@c@w@uIyEiGiBsDiCkGeFeIsEgCoCX}AY}As@iHYkGhCwBvBk@|A?vBd@nFWdA}BtAq@rAFdAn@`@p@Yv@j@WjAJz@uAz@q@r@wA?w@qCiBaG}@HK{@_AiCmCyCeA?q@z@}@a@?k@j@a@?cAgE_BuAmB?iC_@a@VwBaBwES}E}AuE}@gBcAs@p@a@k@a@jAgBqAgCKmEq@gJPgBQwBw@iCb@Y]{@p@i@\\}A~@YSgBEaDp@mADoB]uAb@kA?k@qFsOkAGiAoBuBeIoCmIcBY?s@X{@}A?}@a@}AQ_@bDoBGQs@uBs@cD}AuAkDkAeBRc@|@j@YgBFcAw@oBe@qC?uAYeBRgBeAq@dAc@MyCLoFv@cAwAeEaCa@cCuAuB`@uBlAeA`DiAOEoB?}Ae@YiB?oByFJcAdAs@EkA{CwE{CmBSuAsD{@cBwBoB{CiAgCJgBkAkDqFaD{CqCkAmAoAeEk@sAuB{@k@eAQyCj@a@|@YwAcH{BwBeAqCX_C_@aCXi@_@s@Ds@c@{@P}Av@kDQ{@e@i@w@a@q@bAw@oB}A}AE{@p@k@cBq@?uA}H}LuB?cA}@}@{DkGmEkAa@PoBEmAeE{@Y{@kFOYgBuA`@wA}AcAuASgCuAiCuB}AoDGiBk@sCoBwBwBq@GoAuAk@cAcAkDqAoB{Aa@aDFyFwBmLoJiCeAeEsDgEeBgDmEcBYEmA}AoB{CwBcAHcAeAq@oBqHqGwF_CaFuAiAXk@iCiAwBsDcA_@`@k@FiAaDeFmHsFsDoC}EwFmAiBs@E_CcC{@eF{@kGgBiBsD_EuAyEsDiC{DyDqCgEuAwANi@eBiXwMwH?aDcA{Cp@uAdAkArDoBz@k@iC]`@kAHoA{@}@rAq@Ow@fFiBnBnAkDd@wEq@vBq@G|AkD?mBw@mEq@?X_BJ}ES{@v@eAFmBe@mA|@sDiAk@PcAuBs@wAsHcBa@WqCiAYJs@}@{@}AQKq@e@IuAmBgF_JuA?e@Q_@eEcAyCcAYaDmBoAuAaFFo@}Aq@p@DjD}@|AuCj@Yr@o@Iq@{@?kA_@{@?kDrEgMw@cA?uAiAwBe@i@}@cDkAi@uAmAcAcA_A?cAuAoBeAcBWaDgBiG{DgEk@gDqC?{@w@s@qAG}@a@w@mAuAq@k@?aCkD_Aa@c@s@q@gBcAPqA?aDiCiAi@}@uAuCgBaC{@e@kAeFqCsDqCw@oB_HcD]sA}@s@eNyJw@gBqA}AoBcAc@}AuBk@sFcEcAQ{IkDcBqGqFsDgDY{DgBgDjSk@tAo@XYkA?gB`EiRgKmI_UwByFxz@i@uWDyN|@mLhB}LhBeI|@kH|@}S}AkDKqC|@mEd@iGEsHJ}OEyUmLkP{I{K?wXzBePeSkSn@iR{Pmb@bIoUlKyg@lKhCjHa{@`IgB{Bwv@q@ka@pNcPzPqUjH{ZdS{KxTqUx[wXpq@iRxi@kSlDcAV_\\jAst@?sqAY}j@Xkp@~Eia@?wf@mDg`@sNse@wMwv@yMagBWg}@Vyv@xFcm@fLwg@zI}LkAiR{Puf@mR{h@ce@{fAoYekAqc@k}Aae@_wAgZ_z@VaGbBwIhHuAjHq@tHeIlFmLxD{R~E{ZmDyYoIkZcByYbBwQ`KsG~L_GpGiJjF{S~LiY|GiKxF_UdEoMdGmEhHr@dGfCfEpFdGjSxDpNpGNvFoF~EaGpIcAlKhClRdIzImEpGuHtCgJ|@gJsCmL_VwXwH}LKgJp@{KpGsO|Ga@bPyBdNyCxFoF?aO}BqN_DyJc`@uHmYqGmD{ZcIyYmDuWY{h@w[uIai@{YqNkb@p@c^zPwXxFuf@_Mc|@kVaN?}[p@oFhCeAhHtAhAmAnDGv@uAhBkAfBc@dAa@|@hCv@|AtB_CtCmE|M}L~Es@dGh@jFpC~[aKpUqVtf@sGn`@ia@|s@yJ~hAwItXse@ng@or@daAkS~hAeBjVa{@|^gzA~s@_NnnA_iAdeAyv@hZwdAde@{ZpGcOqu@{fAtXe}@rUi~@deCmEn`@ehBlVeQld@}x@`m@k_A~eBsGrn@gC~w@_wA~^en@hSwIdPxYvQuIjHuWiLmb@mVg`@kV_]kHi`@hAm`Az[wg@r`@ia@hl@_\\d^_iAXwu@Yse@fWmc@dP_k@p`@k|Ajs@oUx_@`@jAha@nk@tHrYka@l]sH|TvIjeB{w@rr@{h@jAyw@xX}uAxFwdA}T_]|Iem@`X_]t\\nFzFbyA|m@l`Al~Alq@n]pdFvn@?b_@pUla@rH`_@~Lp]d_@j~@dBvdA`@jZlEzu@xYla@tHzgAfQph@mEfb@jb@fm@yJtk@xeAzMvu@~f@jb@xn@jSb`Anc@fm@uf@nVqnBfI_wAkAqpAf[agBbM`@fPaOpVnUx\\m`AiElb@bBvXnDd_@Xps@`Q~MnVjp@zQbyAbkAa]bXeiBrGezAjnIot";
	var eh_points_kosta_gabe = "wbuhGnjhHhBeI|@mH|@{S}AmDKoC|@oEd@iGEqHJ}OE{UmLkP{I{K?uXzBgPeSkSn@iR{Pkb@bIoUlK{g@lKhCjH_{@`IiB{Bwv@q@ka@pNcPzPoUjH}ZdS{KxToUx[yXpq@iRxi@kSlDaAVa\\jAqt@?sqAY_k@Xkp@~Eia@?uf@mDg`@sNue@wMwv@yMagBWg}@Vwv@xFem@fLug@zI}LkAiR{Puf@mR{h@ce@{fAoYekAqc@m}Aae@}vAgZaz@VaGbBuIhHuAjHq@tHgIlFkLxD}R~EyZmDyYoIkZcB{YbBuQ`KsG~LaGpGgJjF}S~LiY|GgKxFaUdEmMdGoEhHt@dGfCfEpFdGjSxDnNpGPvFqF~EaGpIcAlKjClRdIzIoEpGsHtCiJ|@gJsCkL_VyXwH{LKiJp@yKpGuO|Ga@bPyBdNyCxFmF?cO}BoN_DyJc`@wHmYoGmD}ZcIwYmDwWY{h@w[sIai@}YqNkb@p@c^zPuXxFwf@_Ma|@kVaN?_\\p@mFhCgAhHvAhAmAnDIv@sAhBmAfBc@dAa@|@hCv@|AtB_CtCmE|M}L~Eq@dGh@jFnC~[aKpUqVtf@sGn`@ia@|s@wJ~hAwItXse@ng@or@daAmS~hAeBjV_{@|^gzA~s@aNnnA_iAdeAyv@hZudAde@{ZpGeOqu@yfAtXe}@rUi~@deCoEn`@chBlVgQld@}x@`m@i_A~eBuGrn@eC~w@awA~^cn@hSyIdPxYvQuIjHuWiLkb@mVg`@kV_]kHk`@hAm`Az[wg@r`@ga@hl@_\\d^aiAXwu@Yse@fWmc@dP_k@p`@k|Ajs@oUx_@`@jAha@nk@vHrYma@l]sH|TxIjeB{w@rr@}h@jAww@xX_vAxFudA}Ta]|Iem@`X_]t\\pFzFbyA|m@l`Al~Alq@n]ndFvn@?b_@pUla@rH`_@~Lp]d_@j~@dBvdA`@jZlEzu@xYla@vHzgAfQph@oEfb@jb@fm@wJtk@veAzMvu@~f@jb@xn@jSb`Anc@fm@uf@nVqnBfI_wAkAqpAf[_gBbM`@fPcOpVnUx\\k`AiEjb@bBvXnDd_@Xps@`Q~MnVjp@zQbyAbkAa]bXciBrGezAjnIoT?a_EiEnr@{\\pr@cB~\\lHrcAfEvXr@rnBxQzi@zQiC~Tvg@~IqGz\\j_A~T`{@deBqGhf@hClSqGlShRvYcAlH`{@dn@rrAdy@aAp@tXhP|KcBxv@|}@rItNdAdc@_Nxd@tI|g@mT`k@qGvYdPdM`]dXgAn^ip@|g@sVzQjRxd@pGl|@~k@wCdPdXxI`JkCpKlc@dMte@aUfn@{FnaA|Q~k@jq@?xYuIn^cAiEduCfXrGn^j_Adv@zZ`Uvg@|\\bAnS|K|QfCaJja@rKrt@xYd_@jPfCs@naAnHjp@rKj_AbBzx@{Fvt@?zi@zFpe@|Q?hPtV|Fzi@tl@?p|@ka@lf@|Kfc@lTnoAePbU~MlH~i@xY|i@uC|gAbBha@hEhR_]flAq@vg@iE|x@rKztA{Fb}@p@|ZkPbwBhEfn@`fAhCtViCnoAzK|o@bAm[trA?~i@l[~MhXcAjP{v@hc@oaA|Q~MiExg@rKtX|Qb]`]f}@|QzKdBlTb`@bP?nc@fk@jTxrAcAp^uXvVhRoHlT`JlnAbh@`l@?lT_RlT|FrGeUpV}QrcAgMte@yNpG?fn@bh@lc@jc@rGdwBxcBd`@cApf@d_@tVqc@b{@jCq@yg@xNia@py@mEd`@_NnaA`]hXhRpSjE~Qlc@`]`]tKvv@lc@l}Axa@nc@dh@d_@liAdyAjqAbAzgAtg@pn@|KhfAvg@hEbP`e@uXlP}ZsSkp@|Fug@|YiRp[wIzN}K`J`NxViRjXlTlPlTnHvIlPdP|YflAhrDnhDtf@hR|YxX`RtX|a@~x@|YuVr[}MrSgPlPaPd]lThMjTxV{K~t@zg@js@}Kt_C`jAfUzZv^|Kpc@tIzVuIv^oEtSmTzNyZtSuVd]st@~a@_N~YsG`ZnEtSzKd]sGtSzKhp@lThMiRs@uIbRdAfUeAx^bPjh@fAxf@nVf]{KhMmc@jEiRlcAm}AzNe_@vKiRhx@kE`b@cA~a@e_@b}@_j@nPcAvKoT~Fe_@kMor@wCwv@?mT|FsVkEoc@xCiRvn@xIpP}KpHuIf]{KzViRt[`]nXgPzf@~x@t[nr@fe@lc@ps@naA`b@hRh`BppAnsAnaAtk@dPlx@d_@nXfCbb@paAbRa]pPmEjUbAbZhCpH`l@n`@taBjMsIbZtXvc@zKbZhRdRd_@|NtIxClp@yKrt@wKpVdB|i@eBd_@eBzi@q`@~x@cRjp@~F~iAdBl}Azn@dP~FpVpH|i@jUbl@yCpt@?lTwKzg@kEtv@kMlnA_Gre@qHte@qP|\\sHrUW~MsLtXiMjSeFxXeZbP{f@b]kUdQi]dPcN`OkM`]qHf`@VdP}FdPmAbPcJb^eFtXeBbOeJ~MkEzJ_KpHqDjReB`NdFjSpH|LjMcAp@tJkA~L}JpFyCpGeFxJYpH}N`]?vH~FdBpDdBxGeBjGdB|D`G_AdBKxCjEa@xAfCpDt@~BvCvEnEdDa@r@yBjCdAdBnE~DdIe@vBpDfCdBhDlCRYzE_C|D_CuBeBbAeBjEyAnEKjD_AvIdBxD_CtH~B~MpHbO}VrWr@|ZXnd@eNtV?xJqHtXkMvv@kItHeBpGwKzKyGhRoX|LwOjS}Rd_@}V`Nsk@|i@wSlT}NzKjAfQqDnUbNd_@vSjp@eBxJ|FdQiQ~i@wSha@kI|ZwCrIvClb@jIpUeFtXdF|Kr@|i@_GdPwOzKkI~NoT|LqDfQeN~MxCpF~BjDvGeBnTrf@_z@vf@aVvYhMbOXlTeJpF}JlFcR|ZiQvIeBxK_GlDcNgCkEz[jE|w@}N~MqHfQwOlFcRoGwC~McmAsG{VlE{^jb@wKiRyn@`@}JmFkEcOaR?yC{KkIdBcJoG{RmTu[kSqDaMufAelAq@_N}NcOwKcOuSsWeB{KuO{Kyb@gQwGqVqLgPix@inAaNeP{VmDkEtGkEgB{ZeBs[uHgY_\\{Rmc@cF{Ytn@avB`^iRnH_y@vOam@_G_NmTa@iQ}w@kh@}j@|FehBdJm`Aj`@st@tz@or@u[m`AyV}j@oPc^iUue@iImc@qLg_@mX|h@uKzj@wj@pTs[`Pm`@?{m@kb@kh@e{AyVhSeFhR~FbPmA|ZXdPkAdQbNzJyChSmTfBiQa@eYhRcJoFaVbAuKlT?fQ_GzZiEzJ?pVkIbPvKvHcJhSwCzJkEtXpDbPtOzKy}@fuCr[tHnPzKp@lT{JdPuWzKai@re@jAnUtO~MbFjb@Yte@aNhRoL~L?dQkAtXeBxXuKdPaVtHuOqFyVsHk`@a@iMfCqDvJr@`N|]|[{J`NaRtXcJpc@{NnGiMxXmTxKwCzKVtG|FjExCfCpDeBpDfCbFiDjEfC|FeBbJvIeBnr@?lc@}J|ZiMdPaNtHuKyJgY_[wZmUca@}KyVzJsWuG}a@fQkAxIvG~j@iIrf@wKlq@gM~LwGvX_V~z@eYfn@mPue@{N{LgQ?aNbOiI|\\jAbNqDtIgUvIiEwI{NuI}]gA{JtVp@pe@hEjDjEcAvGfCtGeBnLjRoH`P{NvIw^jSyRbO{JlDeB`Op@pVqD~j@~BfQnHjS?rWiIdOyRpGmT{YuGfBkX|[gQuIsO`N_C~M`NvJzJbPiEdP{JjC}JoEmPvW}Ff`@sKlTiIfC}J|ZvGfQtKnU?~MuK|LsSrHmPvIq@fPvCxi@lPbOtKjSjAzY`JfRxC`]nDnUjA|KvGhDbFcB`e@bm@`Ntu@fQ|[lPrWiI~i@qDd`@aJbl@aR^wm@dAc]e`@{NsUyVwJqS`^}FnT{NtXqSqH}F?aR}La]lr@Y|Kaa@`kAgMcBaRpe@aJfB_VkS}F}KeQgC{NoTg`@}MoHlTaNlTbFjRoDxi@_CtWnHxJiEfQqDvIwCpVbF|K?xKjX`k@Y|L{JfBY~MnHrW|YlDfQ|LnHha@Xrf@jAd^aNfRyRnE_V|LoHfQr@nc@cFz[|BjRxRfRhEbm@cFrd@wVkSp@sG_NfB{NnUuGvf@jAfp@}Fte@kTjb@a]iSiIiCwCmE_V|MwCtW{YxdAiIz[uKd^?tIvVfPnH|MkAjS{F`O{NrGg\\b@{NtIuGvXeQbOqSjEqWlEeB`]cBdPpSxJlLwI~QcObFrGnHfQuGtXgMvWcFrVbBtWiE|[wR~[aNnUiEjSfMtWnHlTtVePrS_M`]lDvCzi@bFrd@oH`OgMgBqSpG_R|KmLmDcJvHwChRiEzL~QxJlL`NdBfQqDvX_NjS{Nc@_N|KwCpVjAfn@qDd_@sKd_@VjTbFxJiz@ho@sSrWe`@fP`JrVwC|[q@f|A}UpTsOvg@}Flb@~QnpApDnT|BrHdd@`]qDxZcBxg@_Cfn@oDnd@s@nc@cBd`@uG`\\_VxJqSgA}UoVWyIgMoUyNeBwVyJq@yIyRfAyNtImL|[`J~L|YnGva@tVfQrV`Yre@jTpe@rKzJrb@iClLyYhEcOzJkD~BnT_CvsAr@bPYd_@kPh`@mP|LkPfQiIjSjAtWzYnU`]jDvG|L_Cj_AbFzKzJnGxRaOfM}LpO`NjAtWaFvYgQfP_RvJoWeBwVcOsOcPXiRoHqGuG?yN`PwVh`@_NjScJdAwCrHn[fQvRxKjA|h@dBrIeBvf@cBpVvV|KtGiCpf@zx@bBfQjEdPcFfQaNtIcUhCyRnFyN|Km_@hDkP|K}FjToD|KiX|ZnDzi@q@rWmLlDuZcAoWoE{]wIgI|KrKtWbYvYvCd_@nDtV`Jz[X|i@ytBcjA{h@}LojBa^s`AhDwnAwIuVgCwt@kSr@jSiIjRdBdQeBpG_NnaAyN`k@{d@j`Awa@ha@yJfQ_RpGaFd_@sKtHoHjScFps@hEdO`JpHzJjS}FvXwNjRri@lTzbArt@fz@mTfXvI`YfQvGbOlWwHdQbOpDtt@`Y~y@vp@tIzJfQwR`OVjRuG|MoDfP|BnGva@bOzJoFrZa@lLbPdBxYcFxJuVbAm[`NcFbPeQfQ_NvWeQ^sZjDcU~LuG}KsOqt@_Nsd@kP{Zm[wIiTgCqOnUwCjSkPgQsZsHuVmE{JnFjPzw@|Qre@jAre@eMbAuVdPgIjRyNoEkPwIoS}LyNkDyNjDgXzh@{Uzh@{FjSYrVjA|[uG|[eM`NgIjTmLja@mLd_@}Q`NcQha@gXc@{UxIkPbBkPtGcBiQcFmEgIvIwNrHgI_NyN?}QoTuCbOaJpVoDlS_Nc@}k@oU}Bpc@oH|\\yJzg@yJjSgI|MvCvXtCtWqOiD}M}LqOhDkPrWhEnTdBzZiErd@VxJq@`P}BlShEzi@Vla@{Frf@tV`NlWtWaUz[kPjRin@pGgTzKuGvXoDd_@kAtf@kLjS{UtHcFsWiPoE{FnFnDvg@sKjR}\\mE_J|LpZj}A}B`NsK~j@qZjEk[b]eg@xKsVuH_J{KgTbAaJbNxJvg@fTlq@aFd_@sKfRaFlTqOfP?|Mb`@dAt]nTgIfRcQvIgTlEiEd_@sGre@nOrV?jSpOpVpOzZhAhn@bFld@oD|ZlHtf@jA`l@ij@io@}FkT_o@sViPcAc`@gQsVuI}MoSsKmFgEqF|Btt@}\\`m@eMhR}Mb^wN|ZcBdP}BtHwNjS}r@k~@aUmE_JzK_YeP}M?gIoGqKiCwNqUg_@bA?gRiE}K?sWcXyJwYjDeXoTtCe_@uh@wJwJc^aUcOcX?wd@ia@}r@gQiLdn@}XmEgTfP{Qhb@hEd_@t_BnoAh[?tNha@hf@zYbQlT|BrW|MrVkAvWp@vv@sl@jq@uNlScQ|i@zwA~z@|BxIbQnc@fj@`O|c@hmAfdAijBhEdkA}Mpd@u]nd@_JrV{F_@iEfQy`@tg@ubAlq@cMd_@cQrW_{AtoBcMnUus@nb@}MoaAezAfD_aAgtDoOdBkLuHqVhCeIqGa}@ip@cBoTueAfBeB}LmZmp@?_]rGyYvJxC~@iD_AyB~@wBkAkD~GaGvAqHiCaFoMmE?cIe@wIvJyQ~@}EiCgB_A{DuCq@XcGqB_FbB_Gp@aH|DuH?}KtCmE}@uQb@ce@l^}nAp@mS~Ie`@bD{Zp@uVxHia@l^`GbMvBjWzJpa@rIzFiKp@ePtEmE`DmEhEuQq@{QVki@cBcBvLc@~TaH~KoL`FgCxF_MyHix@W{p@qXqU`HiJ`D{DxJwQzDgBvY{R|B|Dp@qF_AuBiAsbAp@oFYce@uCsPwCqFmHuHWoFfE{L~@wWtCgQuC}T_Js|@e@iXiEuWaFe~@uCaF|@{D?aGyHse@yHwCkAkKeT|Eo\\eW{DiKql@mc@aFePvJa^ss@gf@W}\\wC}K{ZsVe@nFoD`GmFsAkAbAgG`HoB?YjD}B|LiNjSgEtAcBjCuEtAkJdJwClKWhKs@lFq@|KXhKtEdQq@zKe@`F|@rHiCnMYfQ{B|EkArH_JpGsIjCwA{DsEwB_JfDwC~Sr@dBe@rH}B_@mH|M_HlE_AhJuCxCp@zDKdIcDvBuExQoDfCwAhRsG|CcBxDmHfB{BpFwL}ZcDsAmFqFeKc@oOuIiArA_AvP{DrOgPxJ_AjD{BcAiPpNsGzLK`GeKjCyFdIcD|LgE`GY~G_HjK_HfBoD{CqKjCcB}DaHl\\d@dHiCvP{D`P{DvIiCzCmH~MlQzDtE`G|Tj_AcVjdB?rxA_JtPbBpwAnFxo@wArHwCvQgY|p@eIrP?dPeBpFmFtIoBhKgPnTiC`HyJ|KkH|LcDwBaFN?yKkJuPkJ|LuCSuC}Tb@gYbDa]e@yJ?aOpB{QJ{SuC_Vb@eViUcAiNp]kHo@uPmK}@uIcDzC_SwAmOvAyHSiCzCoBq@cD^oBuB?_TeIPeIhDgGrFyHu@uE}DyZyRmFbA{VjK}MPd@rHkAfItEfQaF`HoBzSwL|Ke@|LmDrA}B|D{DfBwJsHgGcOwJiKwJ{Q}IuIoDlD{MuGiE{KaMiReIqGmZ{ZqKsHeP~MqKb@gt@|\\zMla@h^nVsGbO_QzY{MtX?xh@gEbOwJjS_JbO}IjSuC`O{FtGwJ?aq@c{@uaBqpA{B|LuNvXwn@mc@wJaOiAwIcB}KiL}L?uHsGuIyF}ZrGmE?sHiEcPmVfC}TzJyXvXeIpGyFfRaFb@cBxKqGnT|Ih`@sGb_@xF|Lq@lTvJzKnDrUh^|\\lDtG{BfRYzZcB`NaFxZmO|ZgLnF_JtHuCtIjSjStJ|LkOrGfEhRhLjSp@xJaXxXjAxJcMfDq@bNoKhDgEvIkH?sGtHaFgB_Xvg@mHpG}P`NmObOaF|M{BlEtU`O{Flb@nDlEtCzZjAxYuCfQYzYjZsG|IdO?nUhLfRhLvXhLrd@`M|LjH~MhLd`@nVbOfErHbB|KbB|j@dItHxXppAcMtWnD|L|ItHjSfRrYxIlVnUbBbOzFz[cBd^fE`OtCtWtUjb@z_@vrAfEfD|B`NkAjRnDxYnKlc@lH|[|IvW?fQnDxK}TfCePlDoVc@{MxJ}f@fC_QfQqRtHwJpFiLnFsNbAuCvJ_JjDcThBcIfCsY?oKtI{MiCgPlDgp@hCcx@sGov@c@qRtVaMtIwJ?qGxJsYrWcI?qRtH{MbAoRfQsN_@gEuGjHia@hA}LuCcPvQkRyFoVW}KuUoc@p@}M?}KgEa]qR}M_FbBiLfB}PoTkA{KgEsH?gQcBwYwQkSbB}K_F{KkSpFePpHcB_NgEkDwXiDyFoToKsHiSyJkAcOp@wJ{BwIoD}L_F{KsGyYtCePnDuIbB}LY_NcImb@uCoTwJqs@_FoFzB{KuJpGuJeB{MtIaMlD__@pHkHgCaMjDiAyKsNyJYmEmDkRcTyKXoFhZ{KtC_MfEiR~WmEhAmEyF{YiHkSePoGfE_MkHsVp@uHoK{j@q@e^nRkTvJlEpGnGhSwYbBmp@gEmEhAoGqGyJoDal@gEuHaT}K`Ma^oKa^gLsVmOgB}W{h@aMm`AzB}LePuf@xXsG`m@dA|IoFdWoc@x_@bAhSuu@_j@}ZgLmc@qG?kZsf@{B{g@zB}MqGkSbBwf@aFqG`FaNaFcB{BuWp@{YcB_Np@}KkH}LwQ{KgEsHymAwIq`@zK}iB`OkVkSwQmE_XjS_F?";
	var eh_levels = "PFFGCEIGFFGDKEEGFIFHGFFIAFFGEHFFHFIEFGFEKAGFGIEEIIFGFGEDIFGEGF?FEDEJFGHFGEGIFEKEDGFCFFDDFJEEDIGGJGEIFGCDGFFGIGGGKFGHEFEFDFHGMFFFJGHFHEJEDHEGEHDEJGEFFJEHFHEDFGJDACGGFEGDJDDCIEFGGGFFCLDGDDEGCIEFFDGEGDEFFGJBFECICGEFJEGEFDEEIGCEEGGLDFEHECIDEHHEGBHDHFEGEEKFEFEAGEIDGHCEGCOEDBFECEHCEGDBDEHEDEDDCBFCDIBGDEFHEE@EDDIBDDFEBFECDAEDDFADECDHCDDE@FADDFDFGBJEDCFCDDHEDFEBCIDFBEEHDDBHEFEEIEDEEEHAEEHEHEG@EEEFEGEGDMFFFEGGFJEEFEFCDGEEECAEGDFEBCHEECDGKDHGGEIFFFHIGFKEB@EDJEHCFIGMEGECCFEIDFFEGIECEEFFBDGEGHDFHEEHFFEGCGCAIEGAFDIDFHAEFEEEIE@FDEDDFHCFKDHBDFGFFJDF@GEBEIFEHFDEHFDFMEHDDEFHEACDHCDFDEIEGGDFFIFDFHEGEEEEHBEGECJDFDFDECAGEF?GFBHCCJ@GDFIDDHDEHEDFFIFDEEFHDKEAFFCDFDEGEEHFEGEBHEDEHEFEGEJEGEHEEFHCDGIDBBHEEGDIEFEEGBJBHGAGCIDDFEF@EICHAFHCJFEDEEHCGDFHEFEHDFDFEIEEJFDGFDHCBGHD@CCBEJEGEDFDFHEFKEEGCDDIGBEJDCCHECFEIFEHEHFCHFJFDHEFFFDHD@EEI?GDEBHEGFCLEFCEEEHAEGDIEFCFJEGCDEKFHFEFDKEEECDHFDEFEEHGDDGEKEHGDEGIFFHFHFECEHFEGELEEGDDGCEIDCEIDHEGFBJFDFIEFHDAFEICDGCEGECAEEJEDCGEGDGEFGCCHEKEAFBG?HEGEIDFCCCEDEHDJCGEHDEEHGFHEFGFIGAIFEGEGFJDHEDEEHFHFDGAHEECGDEEDMEGEDCFDCJGBECECEJGFFEEDFFGDDHFGFGGGFFELGFGFIFGFEFEIDGCFJGBFGIIKEEFEEFGECDIHHMIEEGAFGHDJEFFCCDEDGDFBGCFCDEDFBCDDFCGFDDCDI?DDIDDBDFCDHDFCDHEGH@CFBEEKCDCFDCDFDCFBDDDDECDIEFFEDHFGGDFMCEE@DEBEECCDGDBAEDE@DCDHCEFEDEGDCFDDFDDCEDDEIDDDGFCDDHCDFDDDFDEDECDDGEDEJCDBFBBHDFHFEGDI@EBEECCFCCCLDFEGDFHCDBCEDDJFHDEFEDCDDCGDGDCGDBEIEGCDGDEEECCJDDCFEEFCEBCJEEHFHBCFFDBBDDJEFHDHHE@DDDFEFDIDFBEELCFFEEHEECHCDAGECEHBGGDDIFEEFEEDEFEABEBIGEECFDJGEECEFDEFDHCFEFFHAEEHBEECFEDGDDEACEDLCEEEGECAEEEFCDEHEDEDHEEEDGDDFEPECEFGDEFBDIFBFHDECFEEHCGFDFFCICE@CCFCCDGC?EEIDEEBEEHEEBFJEF?FEHCFGEDDEHGCGFIDEEFDGFGFEFEEJEGDGHIFFEHDEEEEEEECDKDDGHEGEGDJBBBAECBBACB?FCD@CBD@@CBABBFACHBDCE?D?BBCADBDIABCGDB?BBDBB@DBDGDEBBKDFCDFCCFCCEEBFEHGGGIFEDEDFEFDHECDFAFKDECGGBDICDDECGBEGDC@BC@DAFCDK@DDCDCCEDBGCCDBFCCDDFDGECCCED@?ECCAEBCHCDABDDFBCBDFDCFBCDCBDDGCDEEDHCCDECDECEDDGD?EEFBCCFDDBDCBF?CBDFEIEAFHBEBDCAAGC@FBECCFCDBBGAA?DBH@ADFBCF?CDGD@BBABECDAGDBCE@CEBLCEBDBDFACEBBBBDCDBBECFCBDCBDCDBCFDCBGBBBCECABCFBAAFCECF@DAHCEF?BBD@FED@DFBBBDACDEBCEGCACBDCEDDCBFBEBBD@FBBBBDCCCGCCECADCFDADFCABECAEBDB@EBCBCCCCEBC@FE@CBBDBGCBDBC@CECDECCABECCBDCFCBCEACJCDCFCCCECDDGBBDBDDDCCDCDBCGDECBF?BCHBCFCC?CEB@F?CDCCHABDDCACDFBCE@CDBCGDBDDDADKCCACBGBDCEBCEDCDGCD@E@DEDBECDICDCCCCFBCBDBECCDADGDBEBDEBEEDGCCFDCFACFHBEDDECADGCBBCCCDBDDCADCFDCECCAFCBI@CEDEB@CECBFCCGCAEBCFBDDBBDE@BDCDGAFCFBDDCDHDDBGFDHCECDGDECDDAGB@CEDGD?AFAAEKCECACHC??ECHDEEBFDBEGDGHDEBDDCDDDC@GDEAFDCEGDBECCGBCCJCCCCDCCDAHACD@CBACCCBFD@DBBCECAHBFCF@FDDDFDCDDKCDBCDHBBDFEBHDCECFCDBFBDBBBECBBIB?DDBDCDBACCECAABECCCCCDAHCCEBDBBFCCCFBBDBADBGCECC@EGDCDAE@ADHCDCFDAACEBBCGBC?CBEBDCDDICFCCEEGACDBDEBBECCCDGCADBACHCECADABCDFBCEBDEBEDBCECDCDDCFBDDCCDCDCICBDCEBB@ECDCF@CDCGCDDGBCFHDCDCDFAECDDFCBHBBCBDAACFCACEBCBFCDBCBFDFDCCDDC?CEDECBCBCEDBDCDCBCBCICCADDFABDBCD@DCDCADDCBADCBEBDDCBBFDCBBDC@BCDDCFCDCCCBCCABADAGABBBCCACCACECAEBCDACACACCDBEAB@EBH?ECGEFBCCHDCCACCCGEECADECCCECBGCEBCEBEECCACBCBBDBCADB@ICBCBCBACE@@AA@DBBBDAAHBCECDCCCCBEBCH@EBCDBCBBBDBCB@EDBBBGCBDAADBEBBBCFAC@DBEAAABAD@H@@D?CEDB@FA@DB?CAEKCBC?GCBCAEDCE@AD?FBDACDCCCHBBCACADADC@CDDCBACDACBBEBB@@BGAEDCFADABAABCDCFACCEBBADAE@DCGAC@DCACDAEBDAC?BDADABAC?BB@CHA@?BCCAF?AABCEBBCBDEFDDCFA?CCBBGADDEBCFCCFADBHABCCB@CCACB@H@AD?BCDAA@BHCDCEDBIDFCEDCGCFEECGDDCFCGFBCDAECCDBEBBCA@CBDGBDCCCEHBBACBDBCACAAEAB?C@GCBBD?CCBEABBCBCF@ACEAC?DABCADBBEBADCBCDHBEDFDECDBADDCJCBBAADA?DBBFCDCADFCHBFDFC@GBDFDDECAEAAHCAFBEAEBCBG@ECDDICACCEBCAGCB?CAADBBDCDBFCA@CC@CCBGBD@BAHAB@BCACAGDDEC?BDAAADCFCCCBDHBCCDCBBFDCCAAF?BBACB?BCGADACCDCBAACBBDC@BFBECECACFMDF@C@CHBE@GCCE@DCBCCCDCADFDCBECBBECBBCADBCCECBBACEDAB@CEBDHABEBCCBBFBBCBCBCECADCDBBBCCDDCDBCBB@BBAFCBBBBDBBCBCCBDCAB@GCECDCGAB@BBADCAEDBBEABDDEACBDBBBDBBBBCBBG@BCBBFBCDCCFCBCCCBCDCDFCDCEBCCBDCCBBAICBCCBDBBCDBBBBCF@DABCDCCCFCCDAECCBDBBBDBBDBBG@CBBDCBFBCDFBCACBBHADABCBCBCDCAFC@CGCCBADDDDBBBFBBCBIDEADHCCEACCDBBBGCCB@ECCDHBBBBFACBDCCBAE?C@EHDFACEDBAACDHBDBBDECCECDCACCBGB@CCBABCCABGBDCCCDADDFCDAACBFCDACCDEBDDCADBCJB@ADBCEDDEDBDCFDBBADBDBDACFC?H@ECDAECDBFB@DDABDCFDECCBDCCCBCBDBCBHBBECDFCEBBCBFBD@EBC?@DCBD?HDEEFDEIEDDFEBCGEEDCCGBD?BDDJBDCBDGECBAFBDCAADCCFDBBDCHCBCCCGDBBDDDCFDCCCCEBFBBBDDDJBCBB@BBA@FACB?CCECBECDCCECCBBCABABBEDBCDDCBBBDBEBBEDBCCCCAACECCHEBBDBDBDCBECBCCCCCDEDCACDCCDBDFBBCBDACFCBDCDDHCEBDDDCEDCDCDBGDDCBBCBDCGCCDCCBDCDBCDFBBDBDBDAEBDDCDCDABFCDDBCAECACCDCCCBHDCFBAECCBDDGCCECDDCEDDECDDAEFCDDCCEDDBEDCDDCGBBCDBCCDD?CBE@ECDDADCCECDFCDCBECEBDCBBBDCFBDDBDDEBACCECBDCCEDCDFADBBBBADBACAACCBAEBEBDBCGBDBDCCDEA@DDCCCACBCJCDCBADCDCDBGFFDBGCJ@BBBEDCBCCECHCEBDCEAFCCDCCDFDBDCCFBBDBCGBDBBDBBCFBBDF@DC?BEDB@DGDCDCDDCAEABC?HDCFAB@DCCBFCCBEDDAACEBDCDBACECFBBDDCCCFCCDEDBDBCEACDCECCCBFDCCCBDABDCBIBCDCDB@CHAEBDEFCCFCB@HCBCFCDDFABCBBBECDDCDDCDKC@BDGCACECGCADBBECBBDBDAHD?CCADDBCDBBDCHBBCCDABEBCDCABCAECBBCDACCBCAEHCDADDAFBADDECADAGCDABACABCDCACDFBEBDCG?DBDDBCECCDCDACCEB?D@CBFDADCBEBBCBAC@BFADDBDBDCCDDCDADAICCDCE@CBECBCABEABBEBCECBBECCBCCCBCEACEBDCAEBCCEADDAAECCCBHCDCECGBDCEDBCCCECHBDCEDBCDABCCBCGCCCCCCBDBDBBBDADBGABDCFBCECDBGBBDEBC@BHA?BCCBB@CDBBDBBBADBB@DADABCAECACCCC?DACBEBCADDICFCBGACGEHLBECAACECDBDA@HAFDFFEICFEFGBGBEIDCFCAIADBBEJDFDFHBFEEEIADFCEBDJEBEFDAHDEDGBDFDCDBIECGD@GEAEFCFIDCGDCFBHFBCEJDCGAHCCEGEGIEEHFFNEDECCBC@E@FACECDFEFFGDHDHFJCHGDGGIFHCJIGECI@HBHFGKFGBFGIDFHGBGEBJFHGHGFGEJEEGGFMGGHIJGEDFGCGEEBFGGIFHFDLHEFFJEGHIEBDGEFKHEIP";
	var eh_levels_kosta_gabe ="PBCECDBD@AGAFDFFEICFEFGBGBEIDCFCAIADBBEDJDDEHBFEEEIADFCEBDJEBEFDAHDEDGBDFDCDBIECGD@GEAEFCFIDCGDCFBHFBCEJDCGAHCCEGEGIEEGFFCLDECCBC@E@FACFCDEGFFGDHDHFJCHGDGGIFHCJIGECI@HBHFGKFGBFGIDFHGBGEBJFHGHGFGEJEEGGFOGGHIJGEDFGCGEEBFGGIFHFDLHEFFJEGHIEBDGEFKHEJJKFFGCEIGFFGDKEEGFIFHGFFIAFFGEHFFHFIEFGFELAGFGIEEIIFGFGEDIFGEGF?FEDEJFGHFGEGIFFKEDGFCFFDDFKEEDIGGJGEIFGCDGFFGIGGGJFGFHFEFDFGJFFMFHGHFHEJEDHEGEHDEJGEFFJEHFHEDFGJDACGGFEGDJEDCIEFGGGFFCLDGDDEGCIEFFDGEGDEFFGJBFECICGEFIEGEFDEEIGCEELGGDFEGECGDEGIEGBHDHFEGEEPFEFEAGEIDHGCEICEEDBJECEECEHDBDEHEDEDDCBFCDIBGDEFHEE@EDDIBDDFECFECDAEDDFADECDHCDDE@FADDFDFGBJEDCFCDDHEDFEBCIDFBEEHDDBHEFEEIEDEEEHAEEHEHEG@EEEFEGEGDMEFFEGGFJEEFEFCDGEEECAEGDFEBCHEEDDGKDHGGEIFFFHIGFKEB@EDJEHCFIGMEGECCFEIDFFEGIECEEFFBDGEGHDFHEEHFFEGCGCAIEGAFDIDFHAEFEEEIE@FDEDDFHCFJDHBDFGFFJDF@GEBEIFEHFDEHFDFIEHEDDFHEACDHCDFDEIEGGDFFLFDHFEFEEEGFBEHECFIFDFDEBAGEFGFBHCCK?GDFIDDHDEHEDFFIFDEEFHDKEBFFCDFDEGEEHFEGEBHEDEHEFEGEJEGEHEEFHCDGIDBBHEEGDIEFEEGBJBHGAGCIDDFEF?EICHAFHCJFEDEEHCGDFHEFEHDFDFEIEEJFDGFDHCBGHD@CCBEJEGEDFDFHEFKEEGCDDIGCEJDCCHECFEIFEHEHFCHFJFDHEFFFDHD@EEI?GDEBHEGFCLEFCEEEHAEGDIEFCFJEGCDEKFHFEFDKEEECDHFDEFEEHGDDGEKEHGDEGIFFHFHFECEHFEGELEEGDDGCEIDCEIDHEGFBJFDFIEFHDAFEICDGCEGECAEEJEDCGEGDGEFGCCHEKEAFBG?HEGEIDFCCCEDEHDJCGEHDEEHGFHEFGFIGAIFEGEGFJDHEDEEHFHFDGAHEECGDEEDNEGEDCFDCJGBECECEJGFFEEDFFGDDHFGFGGGFFELGFGFIFGFEFEIDGCFJGBFGIIKEEFEEFGECDIHHMIEEGAFGHDJEFFCCDEDGDFBGCFCDEDFBCDDFCGFDDCDI?DDIDDBDFCDHDFCDHEGH@CFBEEKCDCFDCDFDCFBDDDDECDIEFFEDHFGGDFMCEEADEAEECCDGDBAEDE@DCDHCEFEDEGDCFDDFDDCEDDEIDDDGFCDDHCDFDDDFDEDECDDGEDEJCDBFBBHDFHFFGDI@EBEECCFCCCLDFEGDFHCDBCEDDJFHDEFEDCDDCGDGDCGDBEIEGCEGDEEECCJDDCFEEFCEBCJEEHFHBCFFDBBDDJEFHDHHE@DDDFEFDIDFBEELCFFEEHEEDHCDAGECEHBGGDDIFEEFEEDEFEABEBIGEECFDJGEECEFDEFDHCFEFFHAEEHBEECFEDGDDE@CEDLCEEEGEBAEEFCCEEHEDEDHEEEDFDDFMEGCEFGDEFBDIFBFHDECFEEHCGFDFFCHCE@CCFCCEGC?EEIDEEBEEHEEBFJEF?FEHCFGEDDEHGCGFIDEEFDGFGFEFEEJEGDGHIFFEHDEEEEEEECDKDDGHEGEGDP";

	// Google maps-en APIaren 3. bertsioan erabili ahal izateko deskodetu beharra dago
	var decodedPath = google.maps.geometry.encoding.decodePath(eh_points);
	var decodedPath_kosta_gabe = google.maps.geometry.encoding.decodePath(eh_points_kosta_gabe);
	var decodedLevels = decodeLevels(eh_levels);
	var decodedLevels_kosta_gabe = decodeLevels(eh_levels_kosta_gabe);
	
	var eh_polygon;
	var eh_polyline;
	
	function decodeLevels(encodedLevelsString) {
		var decodedLevels = [];
	    
		for (var i = 0; i < encodedLevelsString.length; ++i) {
		    var level = encodedLevelsString.charCodeAt(i) - 63;
		    decodedLevels.push(level);
		}
		return decodedLevels;
	}
	
	function init_polygons(map) {
		eh_polygon = new google.maps.Polygon({
		path: decodedPath,
		levels: decodedLevels,
		strokeColor: "#0000ff",
		strokeOpacity: 1.0,
		strokeWeight: 2,
		//fillColor: "#0000ff",
		//fillOpacity: 0.15,
		fillOpacity: 0,
		map: map
		});
	};
	
	function init_polylines(map) {
		eh_polyline = new google.maps.Polyline({
		path: decodedPath_kosta_gabe,
		levels: decodedLevels_kosta_gabe,
		strokeColor: "#0000ff",
		strokeOpacity: 1.0,
		strokeWeight: 2,
		//fillColor: "#0000ff",
		//fillOpacity: 0.15,
		fillOpacity: 0,
		map: map
		});
	};
	
	function bistaratuEH(map) {
		//alert("zoom-maila: " + map.getZoom());

		var zoomLevel =  map.getZoom();
		
		if (zoomLevel <= 13) {
			// Zoom maila txikia: EHren mugak osorik bistaratu
			if (eh_polygon) {
				eh_polygon.setVisible(true);
			} else {
				init_polygons(map);
			}
			
			if (eh_polyline) {
				eh_polyline.setVisible(false);
			}
		} else {
			// Zoom maila handia: EHren kosta ez bistaratu
			if (eh_polyline) {
				eh_polyline.setVisible(true);
			} else {
				init_polylines(map);
			}
			
			if (eh_polygon) {
				eh_polygon.setVisible(false);
			}
		}
	}
	
	// Erabiltzailearen uneko posizioaren longitudea eta latitudea
	var latLng;
	
	// Proposamenaren lat eta lng existitzen badira horiek erakutsi,
	// bestela unekoak erabili.
	if (proposamen_berria.lat && proposamen_berria.lng) {
		latLng = new google.maps.LatLng(
				proposamen_berria.lat,
				proposamen_berria.lng);
	} else {
		latLng = new google.maps.LatLng(
			unekoLatitudea,
			unekoLongitudea);
		
		// Uneko kokapena eta zoom maila aldi baterako aldagai globaletan gorde,
		// erabiltzaileak uneko kokapena aldaketarik gabe ezarri nahi duen kasurako.
		proposamena_lat_tmp = unekoLatitudea;
		proposamena_lng_tmp = unekoLongitudea;
	}
	
	// Bistaratuko dugun maparen ezaugarriak
	var mapOptions = {
		center: latLng,
		panControl: false,
		zoomControl: true,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	// Mapa bistaratu
	var map = new google.maps.Map(
		document.getElementById(id),
		mapOptions
	);
	
	// Erabiltzailearen uneko posizioa adierazten duen markatzailea
	var marker = new google.maps.Marker({
		position: latLng,
		map: map,
		draggable: true
	});
	
	// Erabiltzaileak marka arrastatzeari uzten dionean longitude eta latitude berriak eskuratu
	google.maps.event.addListener(marker, 'dragend', function(){
		var position = marker.getPosition();
		map.setCenter(position); // set the map center to it's new position
		//alert(position.lat() + ',' + position.lng()); // here are the new lat/lng strings
		
		// Kokapen berriaren longitude eta latitudea gorde aldi baterako aldagai globaletan
		proposamena_lat_tmp = position.lat();
		proposamena_lng_tmp = position.lng();
		proposamena_zoom_tmp = map.getZoom();
	});
	
	// Erabiltzaileak zoom maila aldatzen duenean EHren mugak egokitu (zoom maila txikia -> muga osoa, maila handia -> kostarik gabe)
	google.maps.event.addListener(map, 'zoom_changed', function() {
		bistaratuEH(map);
	})
	
	// Kargatzen ari dela adierazten duen ikurra ezkutatu
	$.mobile.loading('hide');
}

function itzuliUnekoHelbidea(latLng, atzeradeia) {
	// Posizioari dagokion helbidea lortu (alderantzizko geokodeketa, reverse geocoding)
	var geocoder = new google.maps.Geocoder();
	
	var helbidea = {kale_zbk: "", kalea: "", herria: "", herrialdea: ""};
	
	geocoder.geocode({'latLng': latLng}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				var arrAddress = results[0].address_components;
				
				// formatted_address-ek posta-helbidea itzultzen du, adibidez:
				// Del Boulevard Aldapa, 27, 20003 Donostia-San Sebastián, Gipuzkoa, Espainia
				//alert(results[0].formatted_address);
				
				// iterate through address_component array
				$.each(arrAddress, function (i, address_component) {
					
					// Adibidea: 
					// street_number: 27
					// route: Del Boulevard Aldapa
					// locality: Donostia-San Sebastián
					// administrative_area_level_2: Gipuzkoa
					// administrative_area_level_1: Euskadi
					// country: Espainia
					// postal_code: 20003
					//alert(address_component.types[0] + ": " + address_component.long_name);
					
					if (address_component.types[0] == "street_number") {
						console.log("Zbk: " + address_component.long_name); // zbk

						//alert(address_component.long_name);

						helbidea.kale_zbk = address_component.long_name;
					}

					if (address_component.types[0] == "route") {
						console.log("Kalea: " + address_component.long_name); // kalea

						//alert(address_component.long_name);

						helbidea.kalea = address_component.long_name;
					}

					if (address_component.types[0] == "locality") {
						console.log("Herria: " + address_component.long_name); // herria

						//alert(address_component.long_name);

						helbidea.herria = address_component.long_name;
					}
					
					if (address_component.types[0] == "administrative_area_level_2") {
						// Araba, Bizkaia eta Gipuzkoarekin funtzionatuko du,
						// baina Nafarroa? Iparraldea? -> PROBATU!!!!
						console.log("Herrialdea: " + address_component.long_name); // herrialdea 

						//alert(address_component.long_name);
 
						helbidea.herrialdea = address_component.long_name;
					}
				});
				
				// Balioak itzultzeko atzera-dei funtzio bat erabili beharra dago.
				atzeradeia(helbidea);
			} else {
				navigator.notification.alert(
					"Ezin izan dugu helbidea lortu.", // mezua
				    undefined,         							// atzera-deia
				    'Oharra',            						// izenburua
				    'Ados'                 	 					// botoiaren testua
				);
			}
		} else {
			navigator.notification.alert(
				"Ezin izan dugu helbidea lortu.", // mezua
			    undefined,         							// atzera-deia
			    'Oharra',            						// izenburua
			    'Ados'                 	 					// botoiaren testua
			);
		}
	});
}

// Kokapenaren datuak eskuratzean erroreren bat gertatzen denean exekutatzen da
function google_maps_errorea(error) {
	var erroreMezua = '';

	// Errore-koderik jaso dugun egiaztatu
	if(error.code) {
		// Errore-kode bat badago, dagokion errore-mezua prestatu
		switch(error.code)
		{
			case 1: // PERMISSION_DENIED
				erroreMezua ='Ezin izan dugu zure kokapena zehaztu. Mesedez, aktibatu Wifi-a edo GPSa.';
					
				break;

			case 2: // POSITION_UNAVAILABLE
				erroreMezua =
					'Ezin izan dugu zure kokapena zehaztu. Hauta ezazu herri bat zerrendatik.';
				break;
		
			case 3: // TIMEOUT
				erroreMezua =
					'Ezin izan dugu zure kokapena zehaztu. Hauta ezazu herri bat zerrendatik.';
				break;

			default: // UNKOWN_ERROR
				erroreMezua =
					'Ezin izan dugu zure kokapena zehaztu. Hauta ezazu herri bat zerrendatik.';
				break;
		}
	}

	// Errore-mezua bistaratu
	erroreMezua = erroreMezua + "\nHautatu herri bat zerrendatik edo saiatu geokokapena berriz eskuratzen."

	navigator.notification.alert(
		erroreMezua, // mezua
	    undefined,         						// atzera-deia
	    'Oharra',            						// izenburua
	    'Ados'                 	 					// botoiaren testua
	);
	
	$.mobile.changePage('html/hautatu-kokapena.html');
	
	// Kargatzen ari dela adierazten duen ikurra ezkutatu
	$.mobile.loading('hide');
}

//Euskal Herriaren latitudean lurraren erradioa kalkulatzeko Euskal Herriko erdigunearen latitudea erabiliko dugu:
// 42.883008
// http://eu.wikipedia.org/wiki/Euskal_Herriko_erdigunea
// R (km-tan) = 6378 - 21 * sin(lat)
var LURRAREN_ERRADIOA = 6371 - 21 * Math.sin(42.883008); // km

//Angelu bat gradutan hartzen du eta radianetan itzuli.
function radianetara(gradutan) {
	return gradutan * Math.PI / 180;
}

// Bi punturen (koordenatu dezimalak) arteko distantzia kilometrotan itzultzen du
// Erref:
//  http://en.wikipedia.org/wiki/Haversine_formula
//  http://www.movable-type.co.uk/scripts/gis-faq-5.1.html
//  http://mathforum.org/library/drmath/view/51879.html
//  http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
//
function kalkulatuDistantzia(lat1, lon1, lat2, lon2) {
	var x1 = lat2-lat1;
	var dLat = radianetara(x1);
	var x2 = lon2-lon1;
	var dLon = radianetara(x2);
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	                Math.cos(radianetara(lat1)) * Math.cos(radianetara(lat2)) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = LURRAREN_ERRADIOA * c; 

	return d;
}

function ezarriHerria(id, izena, latitudea, longitudea){
	// Hautatutako herriaren id-a, latitudea eta longitudea dagozkien aldagaietan gorde.
	idUnekoHerria = id;
	unekoLatitudea = latitudea;
	unekoLongitudea = longitudea;

	// Helbidea osatu (Herria (Herrialdea)) geokokapena erabili gabe (konexiorik ez badago ere), unekoHelbidea aldagaian gorde eta bistaratu
	ihesidb.transaction(function(tx) {bistaratuHerriaHerrialdea(tx, idUnekoHerria, izena, "hautatu-kokapena-edukia-helbidea");}, function(tx, err){errorCB(tx, err, "bistaratuHerriaHerrialdea")});
};