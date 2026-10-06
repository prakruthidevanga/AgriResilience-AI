def calculate_heat_stress(temperature):
    return min(100, max(0, round((temperature - 30) * 5)))


def calculate_drought_stress(drought_days):
    return round(drought_days / 60 * 100)


def calculate_salinity_stress(salinity):
    return round(salinity / 50 * 100)


def calculate_crop_health(temperature, drought_days, salinity):
    health = 100
    if temperature > 35:
        health -= (temperature - 35) * 2
    health -= drought_days * 0.5
    health -= salinity * 0.3
    return max(0, min(100, round(health)))


def calculate_risk_score(heat_stress, drought_stress, salinity_stress):
    score = heat_stress * 0.3 + drought_stress * 0.4 + salinity_stress * 0.3
    return min(100, round(score))


def calculate_canopy_loss(crop_health):
    return min(100, round((100 - crop_health) * 0.75))


def calculate_soil_moisture(drought_days, salinity):
    moisture = 100 - drought_days * 0.9 - salinity * 0.25
    return max(0, min(100, round(moisture)))


def calculate_yield_loss(crop_health):
    return min(100, round((100 - crop_health) * 0.8))


def calculate_financial_loss(yield_loss):
    example_value_per_acre = 2200
    return round(yield_loss * example_value_per_acre / 100)


def analyze_scenario(data):
    heat_stress = calculate_heat_stress(data['temperature'])
    drought_stress = calculate_drought_stress(data['droughtDays'])
    salinity_stress = calculate_salinity_stress(data['salinity'])
    crop_health = calculate_crop_health(
        data['temperature'], data['droughtDays'], data['salinity']
    )
    risk_score = calculate_risk_score(
        heat_stress, drought_stress, salinity_stress
    )
    yield_loss = calculate_yield_loss(crop_health)

    if risk_score >= 67:
        risk_level = 'High'
        insight = (
            'High climate stress detected. The crop may experience significant '
            'impact if these conditions continue.'
        )
    elif risk_score >= 34:
        risk_level = 'Moderate'
        insight = (
            'Moderate climate stress detected. Monitoring and adaptation may '
            'be required.'
        )
    else:
        risk_level = 'Low'
        insight = 'Low climate stress detected under the selected conditions.'

    return {
        **data,
        'cropHealth': crop_health,
        'heatStress': heat_stress,
        'droughtStress': drought_stress,
        'salinityStress': salinity_stress,
        'riskScore': risk_score,
        'riskLevel': risk_level,
        'canopyLoss': calculate_canopy_loss(crop_health),
        'soilMoisture': calculate_soil_moisture(
            data['droughtDays'], data['salinity']
        ),
        'yieldLoss': yield_loss,
        'financialLoss': calculate_financial_loss(yield_loss),
        'insight': insight,
    }